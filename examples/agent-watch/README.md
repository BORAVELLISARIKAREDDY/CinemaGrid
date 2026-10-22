# CinemaGrid Watch-Folder Agent

Drop a video into `watch/in/`. The agent edits it **unattended** — trims it to a
target duration, adds a synthesized narration and a title overlay, exports an
H.264/AAC MP4 to `watch/out/`, and routes the original to `watch/done/`.
Failures never crash the loop: the file is quarantined to `watch/err/` and a
structured `ok: false` report explains why.

This is the **deterministic flavor**: a fixed rule set. The same input always
produces the same edit. An LLM-planned flavor (agent decides the cut via MCP)
is described at the bottom.

## Quick start

```bash
# from the repository root, with the CLI built:
cargo build -p cinemagrid-cli

# start the watcher (runs forever; Ctrl-C to stop)
./examples/agent-watch/watcher.sh

# in another terminal, drop a video:
cp some_video.mp4 examples/agent-watch/watch/in/
# -> ~15s later: watch/out/some_video.mp4 + some_video.report.json,
#                original in watch/done/
```

Run one job manually (no watcher):

```bash
python3 examples/agent-watch/job.py some_video.mp4 --target 30
```

## The 6 stages

`job.py` executes, per video:

1. **Detect** — the watcher only accepts a file whose size has been stable
   for `WATCH_STABLE` seconds (fully copied), guarded by a `.lock` marker.
2. **Probe** — `cinemagrid-cli probe` returns duration (exact integer
   `Tick`s), frame rate, dimensions, codecs. No video stream → quarantine.
3. **Plan** — `target = min(WATCH_TARGET, source_duration)`, rounded **down**
   to a whole frame in rational ticks
   (`frame = TICKS_PER_SECOND × fps_den / fps_num`, `254,016,000,000` ticks
   per second). Zero float drift, zero desync.
4. **Execute** — one engine session:
   `import → clip.makeSubclip (trim) → file.newSequenceFromClip (matches
   source format) → sequence.addTracks (Audio 2) → tts.create (narration) →
   graphics.newText (title) → file.exportMedia (wait: true)`.
5. **Verify** — the export must have the expected frame count (±2 frames),
   a non-empty file, and no offline media. Mismatch → quarantine.
6. **Deliver** — MP4 + `*.report.json` audit trail in `watch/out/`
   (probe, plan, per-command results, output stats, project path in
   `watch/work/` for inspection).

## Configuration (environment variables)

| Variable | Default | Meaning |
|---|---|---|
| `WATCH_TARGET` | `30` | target duration in seconds (shorter sources are kept whole) |
| `WATCH_TITLE` | `AUTO EDIT` | overlay title text (empty = no title) |
| `WATCH_NARRATION` | *see `job.py`* | TTS narration text |
| `WATCH_SCALE` | `0.5` | export scale fraction |
| `WATCH_POLL` | `5` | watcher scan interval (seconds) |
| `WATCH_STABLE` | `2` | seconds file size must be constant before processing |
| `WATCH_JOBS` | *(forever)* | stop the watcher after N jobs |
| `CINEMAGRID_CLI` | auto-detect | explicit path to `cinemagrid-cli` |

CLI flags override env vars (`job.py --help`).

## Directory layout

```
watch/
├── in/     # drop videos here (.mp4 .mov .mkv .webm .avi .mxf)
├── out/    # rendered MP4 + *.report.json (written even on failure)
├── err/    # quarantined sources the agent could not process
├── done/   # processed originals
├── work/   # per-job .fcproj projects + narrations (audit/debug)
└── watcher.log
```

## Error handling (never crash)

- Bad extension / missing file / no video stream → `JobError`, quarantine.
- Any engine command returning `ok: false` → the failing command id, line
  number and error go into the report; file quarantined.
- Export frame count outside ±2 frames of plan, empty file, or offline media
  → quarantine.
- `job.py` catches all exceptions, always writes a report, exits non-zero so
  the watcher routes the file to `err/`. A corrupt video can never wedge the
  loop — the next scan continues with the remaining files.

## Deterministic vs. LLM-planned flavor

| | This prototype (deterministic) | LLM flavor (future) |
|---|---|---|
| Who plans the edit | fixed rules (`job.py`) | an LLM agent driving the engine over MCP (`cinemagrid-cli mcp`) |
| Retry on failure | no — same input ⇒ same failure | yes — the LLM reads the error and self-corrects (per project rule 0) |
| Best for | unattended bulk pipelines, reproducible output | creative judgment (pacing, hook selection, filler removal) |

Swap-in point: only stage 3 (*Plan*) changes. Keep the watcher, probe,
verify and deliver stages; replace the fixed JSONL with an LLM-generated
command script validated against `cinemagrid-cli commands`. All timing still
passes through exact integer ticks either way.

## Notes & limitations

- Sequence settings are adopted from the source clip (`file.newSequenceFromClip`),
  so vertical/odd-format inputs round-trip correctly; only the requested
  `--scale` resizes the export.
- The narration uses the built-in basic TTS voice. Natural voices
  (`kokoro`) and Whisper-based transcription require optional cargo features
  that are not in the default debug build.
- Processed originals accumulate in `watch/done/`; prune it (or point it at
  a tempfs) for long-running deployments. `watch/work/` holds one folder per
  job for forensic inspection — safe to delete.
- Tested end-to-end on a 26.8 s H.264/AAC clip: 641 frames planned, 641
  frames exported, 4.3 MB out, full report chain green.
