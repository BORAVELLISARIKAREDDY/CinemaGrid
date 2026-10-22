#!/usr/bin/env bash
# CinemaGrid watch-folder agent — orchestrator.
# Polls watch/in for fully-copied videos, runs job.py on each, and routes the
# source file to watch/done (success) or watch/err (failure). One job at a
# time; .lock markers prevent double-processing.
set -u

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IN="$HERE/watch/in"
OUT="$HERE/watch/out"
ERRD="$HERE/watch/err"
DONE="$HERE/watch/done"
LOG="$HERE/watch/watcher.log"
POLL="${WATCH_POLL:-5}"        # seconds between folder scans
STABLE="${WATCH_STABLE:-2}"    # seconds file size must stay constant
JOBS="${WATCH_JOBS:-}"         # optional: stop after N jobs (0/empty = forever)

mkdir -p "$IN" "$OUT" "$ERRD" "$DONE"
shopt -s nullglob

echo "[watcher] $(date -Is) watching $IN (poll ${POLL}s, out: $OUT)"

processed=0
while true; do
    for f in "$IN"/*.mp4 "$IN"/*.mov "$IN"/*.mkv "$IN"/*.webm "$IN"/*.avi "$IN"/*.mxf; do
        lock="$f.lock"
        [ -e "$lock" ] && continue

        # size must be stable across $STABLE seconds (file fully copied)
        s1=$(stat -c%s "$f" 2>/dev/null) || continue
        sleep "$STABLE"
        s2=$(stat -c%s "$f" 2>/dev/null) || continue
        if [ "$s1" != "$s2" ]; then
            echo "[watcher] $(date -Is) $f still copying, deferring"
            continue
        fi

        : > "$lock"
        echo "[watcher] $(date -Is) processing $f"
        if python3 "$HERE/job.py" "$f" >> "$LOG" 2>&1; then
            mv -- "$f" "$DONE/"
            echo "[watcher] $(date -Is) OK  -> $DONE/$(basename "$f")"
        else
            mv -- "$f" "$ERRD/"
            echo "[watcher] $(date -Is) ERR -> $ERRD/$(basename "$f") (see $LOG and $OUT/*.report.json)"
        fi
        rm -f "$lock"
        processed=$((processed + 1))
    done

    if [ -n "$JOBS" ] && [ "$processed" -ge "$JOBS" ]; then
        echo "[watcher] $(date -Is) done ($processed job(s)), exiting"
        exit 0
    fi
    sleep "$POLL"
done
