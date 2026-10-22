# CinemaGrid landing page

This folder contains the CinemaGrid landing page and the generated showcase media used by it.

## What was generated with CinemaGrid only

`assets/video/cinemagrid_showcase.mp4` was rendered from a CinemaGrid project assembled by the engine itself:

- procedural demo footage from CinemaGrid's built-in generators (`Ocean_Sunset`, `Aurora_Timelapse`, `City_Night_Drive`, `Desert_Dunes`, `Misty_Forest`, `Neon_Loop`)
- AI narration clips created with `tts.create` on audio track `Audio 3`
- typography and lower-third cards created with `graphics.newText`
- text styling applied with `graphics.set`
- final H.264/AAC MP4 export through `cinemagrid-cli export`

The edit recipe is in [`tools/showcase-edit.jsonl`](tools/showcase-edit.jsonl). Re-run the full media build with:

```bash
landing/tools/render_showcase.sh
```

The script builds `cinemagrid-cli`, runs the JSONL edit script, exports the MP4, and refreshes the poster frame.

## Run the landing page locally

```bash
python3 -m http.server 4173 --directory landing
```

Then open <http://localhost:4173>.

## How AI works with the video in CinemaGrid

CinemaGrid is agent-drivable: an AI assistant does not simulate mouse clicks. It sends typed engine commands to `Session::execute` through the CLI, MCP server, or control channel.

The loop is:

1. **Inspect** — read the project, sequence, clips, transcripts, and available commands (`inspect sequence`, `engine.commands`, `transcript.inspect`).
2. **Plan** — choose stable command IDs and exact `Tick` values. CinemaGrid uses rational integer ticks instead of floating-point seconds, so agent edits stay frame-accurate.
3. **Execute** — dispatch commands such as `tts.create`, `graphics.newText`, `effects.apply`, or `file.exportMedia`.
4. **Recover safely** — invalid commands return structured errors instead of crashing, so the agent can inspect the error and retry.

The showcase video demonstrates that workflow: the narration is AI TTS, the titles are engine graphics commands, and the final movie is exported by CinemaGrid's clean-room Rust pipeline.
