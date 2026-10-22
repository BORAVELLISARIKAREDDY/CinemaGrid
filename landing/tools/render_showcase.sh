#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

mkdir -p target/narrations landing/assets/video landing/assets/images

cargo build --package cinemagrid-cli

./target/debug/cinemagrid-cli run landing/tools/showcase-edit.jsonl --save-as target/showcase.fcproj
./target/debug/cinemagrid-cli export landing/assets/video/cinemagrid_showcase.mp4 \
  --project target/showcase.fcproj \
  --scale 0.5 \
  --settings '{"bitrateMode":"vbr1Pass","bitrateKbps":1200}'

./target/debug/cinemagrid-cli export target/showcase-poster.png \
  --project target/showcase.fcproj \
  --start 2.0 \
  --end 2.05 \
  --scale 0.5
cp target/showcase-poster000.png landing/assets/images/poster.png

printf '\nWrote landing/assets/video/cinemagrid_showcase.mp4\n'
printf 'Wrote landing/assets/images/poster.png\n'
