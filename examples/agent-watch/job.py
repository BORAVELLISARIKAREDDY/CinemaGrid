#!/usr/bin/env python3
"""CinemaGrid watch-folder agent job — deterministic flavor.

Pipeline per dropped video (see README.md):
    probe -> plan -> (makeSubclip -> newSequenceFromClip -> addTracks
                      -> tts narration -> title -> export) -> verify -> report

All engine interaction goes through typed `cinemagrid-cli` commands; every
step keeps its structured result in the report for the audit trail.

Usage:
    python3 job.py <video-file> [--target SECONDS] [--title TEXT]
                   [--narration TEXT | --no-narration] [--scale F]

Exits 0 and writes watch/out/<name>.mp4 + <name>.report.json on success;
exits 1 and writes a ok:false report on failure (never crashes).
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

TICKS_PER_SECOND = 254_016_000_000  # CinemaGrid rational time base

HERE = Path(__file__).resolve().parent          # examples/agent-watch/
REPO_ROOT = HERE.parent.parent                  # repository root
WATCH = HERE / "watch"
DEFAULT_OUT = WATCH / "out"
WORK_PARENT = WATCH / "work"

VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".webm", ".avi", ".mxf"}


class JobError(Exception):
    """A step failed; message is safe to show and log."""


def find_cli(explicit: str | None) -> Path:
    candidates = []
    if explicit:
        candidates.append(Path(explicit))
    env = os.environ.get("CINEMAGRID_CLI")
    if env:
        candidates.append(Path(env))
    candidates += [
        REPO_ROOT / "target" / "release" / "cinemagrid-cli",
        REPO_ROOT / "target" / "debug" / "cinemagrid-cli",
    ]
    for c in candidates:
        if c.is_file() and os.access(c, os.X_OK):
            return c.resolve()
    raise JobError(
        "cinemagrid-cli not found; build it with "
        "`cargo build -p cinemagrid-cli` or set CINEMAGRID_CLI"
    )


def run_json(args: list[str], input_text: str | None = None) -> dict:
    """Run the CLI, parse its JSON stdout. Raises JobError with context."""
    proc = subprocess.run(
        [str(a) for a in args],
        input=input_text,
        capture_output=True,
        text=True,
        cwd=REPO_ROOT,
    )
    if proc.returncode != 0:
        tail = (proc.stderr or proc.stdout or "").strip()[-400:]
        raise JobError(f"`{Path(args[0]).name} {' '.join(map(str, args[1:]))}` "
                       f"failed (exit {proc.returncode}): {tail}")
    try:
        return json.loads(proc.stdout)
    except json.JSONDecodeError:
        raise JobError(f"unexpected non-JSON output: {proc.stdout[:400]}")


def run_script(cli: Path, script: list[dict], project: Path, save_as: Path) -> list[dict]:
    """Run a JSONL command script through one engine session."""
    lines = "".join(json.dumps(cmd) + "\n" for cmd in script)
    args = [cli, "run", "-", "--project", project, "--save-as", save_as]
    results = []
    proc = subprocess.run(args, input=lines, capture_output=True, text=True, cwd=REPO_ROOT)
    if proc.returncode != 0:
        raise JobError(f"engine run failed: {(proc.stderr or proc.stdout)[-400:]}")
    for n, line in enumerate(proc.stdout.splitlines(), 1):
        if not line.strip():
            continue
        r = json.loads(line)
        results.append(r)
        if not r.get("ok"):
            raise JobError(
                f"command `{r.get('id')}` (line {n}) failed: "
                f"{r.get('error') or json.dumps(r.get('result'))[:300]}"
            )
    return results


def probe(cli: Path, src: Path) -> dict:
    info = run_json([cli, "probe", src])
    if "video" not in info or not info.get("video"):
        raise JobError(f"no video stream in {src.name}")
    return info


def frame_ticks(probe_info: dict) -> int:
    fr = probe_info["video"]["frame_rate"]
    return TICKS_PER_SECOND * fr["den"] // fr["num"]


def build_report_stub(src: Path, probe_info: dict, target_s: float) -> dict:
    return {
        "ok": False,
        "agent": "cinemagrid-watch-folder v1 (deterministic)",
        "source": str(src),
        "probedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "probe": {
            "durationSeconds": probe_info["duration"] / TICKS_PER_SECOND,
            "width": probe_info["video"]["width"],
            "height": probe_info["video"]["height"],
            "fps": probe_info["video"]["frame_rate"],
            "codec": probe_info["video"]["codec"],
            "audio": [a["codec"] for a in probe_info.get("audio_streams", [])],
        },
        "plan": {"targetSeconds": target_s},
        "steps": [],
        "output": None,
        "error": None,
    }


def log_step(report: dict, name: str, detail: dict) -> None:
    report["steps"].append({"step": name, **detail})


def main() -> int:
    ap = argparse.ArgumentParser(description="CinemaGrid watch-folder agent job")
    ap.add_argument("video", type=Path, help="video file to auto-edit")
    ap.add_argument("--target", type=float, default=float(os.environ.get("WATCH_TARGET", 30)),
                    help="target duration in seconds (default: 30 or $WATCH_TARGET)")
    ap.add_argument("--title", default=os.environ.get("WATCH_TITLE", "AUTO EDIT"),
                    help="overlay title text (default: AUTO EDIT)")
    ap.add_argument("--narration", default=os.environ.get(
        "WATCH_NARRATION", "Auto edited by the CinemaGrid watch folder agent"),
        help="TTS narration text")
    ap.add_argument("--no-narration", action="store_true", help="skip TTS narration")
    ap.add_argument("--scale", type=float, default=float(os.environ.get("WATCH_SCALE", 0.5)),
                    help="export scale fraction (default: 0.5)")
    ap.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    ap.add_argument("--cli", type=Path, default=None,
                    help="path to cinemagrid-cli (default: auto-detect)")
    args = ap.parse_args()

    src: Path = args.video.resolve()
    out_dir: Path = args.out_dir.resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    report_path = out_dir / (src.stem + ".report.json")

    try:
        if src.suffix.lower() not in VIDEO_EXTS:
            raise JobError(f"unsupported extension {src.suffix!r} ({src.name})")
        if not src.is_file():
            raise JobError(f"not a file: {src}")

        cli = find_cli(args.cli)

        # -- stage 2: probe --------------------------------------------------
        info = probe(cli, src)
        fticks = frame_ticks(info)
        dur_s = info["duration"] / TICKS_PER_SECOND
        target_s = max(1.0, min(float(args.target), dur_s))
        # round the trim point DOWN to a whole frame (exact rational ticks)
        end_tick = int(target_s * TICKS_PER_SECOND) // fticks * fticks
        expected_frames = end_tick // fticks
        report = build_report_stub(src, info, end_tick / TICKS_PER_SECOND)
        log_step(report, "probe", {"durationSeconds": round(dur_s, 3),
                                   "frameTicks": fticks, "plannedTrimTicks": end_tick})

        job_id = time.strftime("%Y%m%d-%H%M%S") + "_" + src.stem[:40]
        work = WORK_PARENT / job_id
        work.mkdir(parents=True, exist_ok=False)

        # -- stage 4a: import + trim to target -------------------------------
        imp = run_json([cli, "import", src, "--save-as", work / "job.fcproj"])
        item = imp["items"][0]
        log_step(report, "import", {"item": item, "errors": imp.get("errors", [])})

        phase_a = run_script(cli, [
            {"id": "clip.makeSubclip",
             "params": {"item": item, "name": src.stem + "_trim", "start": 0, "end": end_tick}},
        ], work / "job.fcproj", work / "trim.fcproj")
        trim_item = phase_a[0]["result"]["item"]
        log_step(report, "trim", {"subclipItem": trim_item, "endTick": end_tick})

        # -- stage 4b: sequence + enrichment + export ------------------------
        w, h = info["video"]["width"], info["video"]["height"]
        script = [
            {"id": "file.newSequenceFromClip", "params": {"items": [trim_item]}},
            {"id": "sequence.addTracks", "params": {"audio": 1, "video": 0}},
        ]
        if not args.no_narration and args.narration:
            script.append({"id": "tts.create", "params": {
                "text": args.narration, "voice": "basic-female",
                "seconds": 0.5, "track": "Audio 2",
                "dir": str(work / "narr")}})
        if args.title:
            script.append({"id": "graphics.newText", "params": {
                "text": args.title, "time": fticks // 4, "seconds": min(3.0, end_tick / TICKS_PER_SECOND),
                "position": [w // 2, max(24, h // 8)], "size": max(24, h // 14)}})
        script.append({"id": "file.exportMedia", "params": {
            "path": str(out_dir / (src.stem + ".mp4")), "format": "h264",
            "bitrateMode": "vbr1Pass", "bitrateKbps": 1200,
            "scale": args.scale, "wait": True}})
        phase_b = run_script(cli, script, work / "trim.fcproj", work / "final.fcproj")
        for r in phase_b:
            log_step(report, r["id"], {"ok": True, "result": r.get("result")})

        # -- stage 5: verify ---------------------------------------------------
        export_res = next(r["result"]["result"] for r in phase_b if r["id"] == "file.exportMedia")
        frames = export_res["frames"]
        out_file = Path(export_res["path"])
        tolerance = 2  # frames
        if abs(frames - expected_frames) > tolerance:
            raise JobError(
                f"duration mismatch: expected ~{expected_frames} frames, export has {frames}")
        if not out_file.is_file() or out_file.stat().st_size == 0:
            raise JobError("export file missing or empty")
        if export_res.get("offlineMedia"):
            raise JobError(f"offline media in export: {export_res['offlineMedia']}")

        report["ok"] = True
        report["output"] = {
            "file": str(out_file), "bytes": export_res["bytes"], "frames": frames,
            "width": round(w * args.scale), "height": round(h * args.scale),
        }
        report["project"] = str(work / "final.fcproj")
        report_path.write_text(json.dumps(report, indent=2))
        print(json.dumps({"ok": True, "output": str(out_file), "report": str(report_path)}))
        return 0

    except JobError as e:
        report = locals().get("report") or {
            "ok": False, "agent": "cinemagrid-watch-folder v1 (deterministic)",
            "source": str(src), "steps": [], "output": None,
        }
        report["ok"] = False
        report["error"] = str(e)
        try:
            report_path.write_text(json.dumps(report, indent=2))
        except Exception:
            pass
        print(json.dumps({"ok": False, "error": str(e), "report": str(report_path)}),
              file=sys.stderr)
        return 1
    except Exception as e:  # never crash: quarantine with the reason
        try:
            fallback = {"ok": False, "agent": "cinemagrid-watch-folder v1",
                        "source": str(src), "steps": [], "output": None,
                        "error": f"unexpected: {type(e).__name__}: {e}"}
            report_path.write_text(json.dumps(fallback, indent=2))
        except Exception:
            pass
        print(json.dumps({"ok": False, "error": f"{type(e).__name__}: {e}"}), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
