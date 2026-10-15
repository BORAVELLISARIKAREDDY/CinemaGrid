# Attribution

Every non-code asset in CinemaGrid, with its author, source and licence. Each file listed here also has
a `<file>.attribution` sidecar with full details. The rules are in [AGENTS.md](AGENTS.md) §1: no Adobe
iconography, images or other Adobe assets; open licences only; every asset attributed.
`cargo xtask assets` checks that this index and the sidecars cover every asset in the repository.

## Asset files

| Asset | Author | Source | Licence |
|---|---|---|---|
| `crates/ui-egui/src/i18n/it.tsv` | CinemaGrid contributors | Original work: clean-room Italian interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/id.tsv` | CinemaGrid contributors | Original work: clean-room Indonesian interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/ko.tsv` | CinemaGrid contributors | Original work: clean-room Korean interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/fr.tsv` | CinemaGrid contributors | Original work: clean-room French interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/pt-br.tsv` | CinemaGrid contributors | Original work: clean-room Brazilian Portuguese interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/ru.tsv` | CinemaGrid contributors | Original work: clean-room Russian interface translations | MIT OR Apache-2.0 |
| `crates/ui-egui/src/i18n/uk.tsv` | CinemaGrid contributors | Original work: clean-room Ukrainian interface translations | MIT OR Apache-2.0 |
| `assets/fonts/Inter-Regular.ttf` | The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) |
| `assets/fonts/Inter-Medium.ttf` | The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) |
| `assets/fonts/Inter-SemiBold.ttf` | The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) |
| `assets/fonts/Inter-Bold.ttf` | The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) |
| `assets/fonts/Inter-Italic.ttf` | The Inter Project Authors | https://github.com/rsms/inter | OFL-1.1 (`assets/fonts/OFL-Inter.txt`) |
| `assets/fonts/NotoSerif-Regular.ttf` | The Noto Project Authors | https://github.com/notofonts/latin-greek-cyrillic | OFL-1.1 (`assets/fonts/OFL-NotoSerif.txt`) |
| `assets/fonts/JetBrainsMono-Regular.ttf` | The JetBrains Mono Project Authors | https://github.com/JetBrains/JetBrainsMono | OFL-1.1 (`assets/fonts/OFL-JetBrainsMono.txt`) |
| `docs/images/filmcraft-hero.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot; NASA Apollo 11 film and TV footage (images.nasa.gov; US Government work, public domain; NASA does not endorse this project), subtitles from the NASA Apollo 11 air-to-ground transcript (public domain), CC0 Chopin (Musopen) | MIT OR Apache-2.0; footage and transcript public domain |
| `docs/images/filmcraft-color.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot; frames from Charade (1963, public domain) | MIT OR Apache-2.0; film frames public domain |
| `docs/images/filmcraft-keyframes.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot; frames from Night of the Living Dead (1968, public domain) | MIT OR Apache-2.0; film frames public domain |
| `docs/images/filmcraft-export.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot; frame from Night of the Living Dead (1968, public domain) | MIT OR Apache-2.0; film frames public domain |
| `docs/images/filmcraft-assembly.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot; frames from Carnival of Souls (1962), Night of the Living Dead (1968), thumbnails of all demo media | MIT OR Apache-2.0; film frames public domain |
| `docs/images/filmcraft-lumetri.png` | CinemaGrid contributors | Original work: CinemaGrid UI crop (Lumetri Color panel) | MIT OR Apache-2.0 |
| `docs/images/filmcraft-scopes.png` | CinemaGrid contributors | Original work: CinemaGrid UI crop (scopes of a Charade (1963) frame, public domain) | MIT OR Apache-2.0 |
| `docs/images/filmcraft-effects.png` | CinemaGrid contributors | Original work: CinemaGrid screenshot crop; NASA Earth Views (US Government work, public domain) | MIT OR Apache-2.0; footage public domain |
| `docs/images/filmcraft-timeline.png` | CinemaGrid contributors | Original work: CinemaGrid UI crop; thumbnails from Night of the Living Dead (1968) and Carnival of Souls (1962), CC0 Chopin waveform | MIT OR Apache-2.0; film frames public domain |
| `assets/app-icon/filmcraft.svg` | bsarika (CinemaGrid contributor) | CinemaGrid app icon: dark cinema canvas, viewfinder corner brackets, a sweeping C-G monogram over timeline clips, a backdrop grid and a playhead. 512-unit full-bleed tile, rx=112. The canonical artwork; regenerate the derived icons with packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `packaging/macos/dmg/background.svg` | @XusBadia (original design), modified for CinemaGrid by bsarika | Original work: CinemaGrid macOS DMG window background, derived from the app icon (`assets/app-icon/filmcraft.svg`); title re-outlined as "CinemaGrid"; rendered to `background.tiff` by `packaging/macos/dmg/generate.py` | MIT OR Apache-2.0 (`LICENSE-MIT`, `LICENSE-APACHE`) |
| `packaging/macos/dmg/background.tiff` | @XusBadia (original design), modified for CinemaGrid by bsarika | Rendered from `packaging/macos/dmg/background.svg` by `packaging/macos/dmg/generate.py` | MIT OR Apache-2.0 (`LICENSE-MIT`, `LICENSE-APACHE`) |
| `assets/app-icon/filmcraft-small.svg` | bsarika (CinemaGrid contributor) | Lighter trace of the CinemaGrid app icon (no backdrop grid, glow, blur or viewfinder detail). Copied to the Linux hicolor scalable slot by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/filmcraft-1024.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/filmcraft-macos-512.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh, inside Apple's 824/1024 icon grid (transparent margin). Embedded in the app by apps/filmcraft/src/main.rs. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/filmcraft.icns` | bsarika (CinemaGrid contributor) | Built from resvg renders of filmcraft.svg (Apple icon grid) with iconutil by packaging/icons.sh (a Pillow ICNS writer where iconutil is unavailable). | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/filmcraft.ico` | bsarika (CinemaGrid contributor) | PNG renders of filmcraft.svg (resvg) packed by cargo xtask ico in packaging/icons.sh. Embedded in filmcraft.exe by apps/filmcraft/build.rs. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/16x16/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/24x24/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/32x32/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/48x48/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/64x64/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/128x128/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/256x256/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/512x512/apps/ai.storyteller.filmcraft.png` | bsarika (CinemaGrid contributor) | Rendered from filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `assets/app-icon/hicolor/scalable/apps/ai.storyteller.filmcraft.svg` | bsarika (CinemaGrid contributor) | Copy of filmcraft-small.svg, made by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |
| `apps/filmcraft-web/web/favicon.png` | bsarika (CinemaGrid contributor) | Rendered from assets/app-icon/filmcraft.svg with resvg by packaging/icons.sh. | MIT OR Apache-2.0 (`assets/app-icon/LICENSE.txt`) |

## Golden test images

Reference frames for the renderer golden tests (`crates/golden`), rendered by CinemaGrid itself from
procedural demo footage (`crates/media/src/generators.rs`); no external media. Regenerate with
`FILMCRAFT_BLESS=1 cargo test -p filmcraft-golden`.

| Asset | Author | Source | Licence |
|---|---|---|---|
| `crates/golden/goldens/blend_modes.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `blend_modes`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/crop.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `crop`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/gaussian_blur.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `gaussian_blur`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/graphic_shapes.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `graphic_shapes`) from procedurally generated media and bundled OFL fonts | MIT OR Apache-2.0 |
| `crates/golden/goldens/graphic_template.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `graphic_template`; a built-in CinemaGrid graphics template) from procedurally generated media and bundled OFL fonts | MIT OR Apache-2.0 |
| `crates/golden/goldens/graphic_rich_text.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `graphic_rich_text`) from procedurally generated media and bundled OFL fonts | MIT OR Apache-2.0 |
| `crates/golden/goldens/log_to_rec709.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `log_to_rec709`) from procedurally generated media re-encoded as S-Log3 | MIT OR Apache-2.0 |
| `crates/golden/goldens/hdr_tone_map.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `hdr_tone_map`) from procedurally generated media re-encoded as Rec. 2100 PQ | MIT OR Apache-2.0 |
| `crates/golden/goldens/graphic_title.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `graphic_title`) from procedurally generated media and bundled OFL fonts | MIT OR Apache-2.0 |
| `crates/golden/goldens/lumetri_basic.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `lumetri_basic`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/lumetri_hdr_pq.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `lumetri_hdr_pq`) from procedurally generated media re-encoded as Rec. 2100 PQ | MIT OR Apache-2.0 |
| `crates/golden/goldens/lumetri_presets_grid.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, `lumetri_presets_grid`): CinemaGrid's own Lumetri presets on its procedural preview picture | MIT OR Apache-2.0 |
| `crates/golden/goldens/text_burnin.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `text_burnin`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/transform_opacity.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `transform_opacity`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/transition_cross_dissolve.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `transition_cross_dissolve`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/transition_dip_to_black.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `transition_dip_to_black`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/transition_wipe.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `transition_wipe`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/mask_blur.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `mask_blur`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/mask_color.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `mask_color`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/mask_inverted.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `mask_inverted`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/mask_opacity.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `mask_opacity`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_distort.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_distort`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_ultra_key.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_ultra_key`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_glows.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_glows`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_spacer_stroke_shadow.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_spacer_stroke_shadow`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_vr_rotate.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_vr_rotate`) from procedurally generated media | MIT OR Apache-2.0 |
| `crates/golden/goldens/vfx_stylize.png` | CinemaGrid contributors | Original work: golden reference rendered by CinemaGrid (crates/golden/tests/golden.rs, scene `vfx_stylize`) from procedurally generated media | MIT OR Apache-2.0 |

## Third-party media shown in screenshots

The README screenshots show frames from these works. The media files themselves are not in the
repository; each screenshot's sidecar lists exactly which appear.

| Work | Author | Status | Source |
|---|---|---|---|
| Night of the Living Dead (1968) | George A. Romero / Image Ten | US public domain (no copyright notice) | https://archive.org/details/night-of-the-living-dead-1968-english |
| Carnival of Souls (1962) | Herk Harvey / Harcourt Productions | US public domain | https://archive.org/details/CarnivalOfSoulsVideoQualityUpgrade |
| Charade (1963) | Stanley Donen / Universal | US public domain (defective notice) | https://archive.org/details/charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie |
| Earth Views from the ISS (NHQ_2020_1221) | NASA | US Government work, public domain (no NASA endorsement implied) | https://images.nasa.gov/details/NHQ_2020_1221_Earth%20Views |
| Chopin: Nocturne Op. 48 No. 1, Ballade No. 1 | Musopen | CC0-1.0 | https://archive.org/details/musopen-chopin |

## Assets drawn or generated in code

These are original work by CinemaGrid contributors under the project licence (MIT OR Apache-2.0). None
is traced or derived from Adobe artwork.

| Asset | Where |
|---|---|
| UI icons (tools, transport, panels, header) | `crates/ui-egui/src/icons.rs`: vector paths on a 16×16 grid |
| Source and Program range braces and trim hover cues | `crates/ui-egui/src/panels/monitor.rs` and `source_range.rs`: original generic vector shapes by CinemaGrid contributors, MIT OR Apache-2.0; no third-party artwork |
| Align / distribute / paragraph-alignment glyphs in the graphics panel | `crates/ui-egui/src/panels/graphics.rs` (`align_glyph`): bars and lines drawn with the egui painter |
| Demo footage (ocean sunset, aurora, city night, dunes, forest, plasma), bars and tone, counting leader, colour matte | `crates/media/src/generators.rs` |
| Built-in graphics templates (Lower Third – Slab / Rule, Ticker – Crawl, Title – Centered / Boxed, End Credits – Roll, Callout – Pointer / Tag) and their placeholder text | `crates/project/src/gtemplate.rs` (`builtin_templates`): original designs defined in code with the bundled Inter font; thumbnails are rendered at runtime, no template, image or font files |
| Lumetri "Look" presets (Teal & Orange, Warm Film, …) | `crates/render/src/effects.rs` (`apply_look`): procedural colour transforms, not LUT files |
| Lumetri Presets (Effects panel: Cinematic, Film Emulation, Monochrome, Technical) and their preview picture | `crates/render/src/lumetri_presets.rs`: Lumetri parameter values chosen by contributors, descriptive names, and a procedural preview picture (dusk sky, ridges, lake, grey ramp, colour chips) |
| Colour palette and layout metrics | `crates/ui-egui/src/theme.rs`: colour values and sizes only; no artwork |

## Optional build input: craft-fonts

These fonts are **not files in this repository**. Builds made with the optional build input
`CRAFT_FONTS_DIR` (all official releases; see [docs/contributing.md](docs/contributing.md#building-with-craft-fonts))
embed them from [storytold/craft-fonts](https://github.com/storytold/craft-fonts), where each file,
its author, pinned upstream source and licence text are listed in its
[ATTRIBUTION.md](https://github.com/storytold/craft-fonts/blob/main/ATTRIBUTION.md). Release packages
carry each font's licence as `OFL-<family>.txt`.

| Font | Use in CinemaGrid | Licence |
|---|---|---|
| BIZ UDPGothic Regular, Bold (Morisawa) | Japanese UI text; Japanese fallback for sans titles (the web build embeds only Regular) | OFL-1.1 |
| Shippori Mincho Regular (FONTDASU) | Japanese fallback for serif titles (native builds) | OFL-1.1 |
| BIZ UDMincho Regular (Morisawa) | Japanese fallback for serif titles (native builds) | OFL-1.1 |

## First-party brand marks

The ArtCraft name, wordmark and logos are trademarks of the ArtCraft Team. They are not open source and
are not covered by the project licence; they may be used only unmodified and only in the context of
CinemaGrid, under [`docs/brand/LICENSE-brand.txt`](docs/brand/LICENSE-brand.txt). Forks and modified versions must
remove them (AGENTS.md §1.8).

| File | Author | Source | Licence |
|---|---|---|---|
| `docs/brand/artcraft-logo-white.png` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft wordmark, light ink for dark backgrounds) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-logo-white.svg` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft wordmark, light ink for dark backgrounds) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-logo.png` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft wordmark (symbol + "ARTCRAFT"), dark ink for light backgrounds) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-logo.svg` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft wordmark (symbol + "ARTCRAFT"), dark ink for light backgrounds) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-mark-black.png` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft symbol ("A" mark), black) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-mark-black.svg` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft symbol ("A" mark), black) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-mark.png` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft symbol ("A" mark), blue) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/artcraft-mark.svg` | ArtCraft Team | Original work: first-party ArtCraft brand mark (ArtCraft symbol ("A" mark), blue) | ArtCraft trademark, not open source; `docs/brand/LICENSE-brand.txt` (not MIT/Apache) |
| `docs/brand/cinemagrid-logo-white.png` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid wordmark logo PNG render (light ink for dark UI) | MIT OR Apache-2.0 |
| `docs/brand/cinemagrid-logo-white.svg` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid wordmark logo vector (light ink for dark UI) | MIT OR Apache-2.0 |
| `docs/brand/cinemagrid-logo.png` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid wordmark logo PNG render (dark ink for light UI) | MIT OR Apache-2.0 |
| `docs/brand/cinemagrid-logo.svg` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid wordmark logo vector (dark ink for light UI) | MIT OR Apache-2.0 |
| `docs/brand/cinemagrid-mark.png` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid icon mark PNG render | MIT OR Apache-2.0 |
| `docs/brand/cinemagrid-mark.svg` | bsarika (CinemaGrid contributor) | Original work: CinemaGrid icon mark vector | MIT OR Apache-2.0 |

## Third-party source code

Source files that are transcribed from third-party code rather than written from scratch. Each keeps
the original copyright and permission notice in its header.

| File | Author | Source | Licence |
|---|---|---|---|
| `crates/platform/src/nvenc/ffi.rs` | NVIDIA Corporation (`nvEncodeAPI.h`); CinemaGrid contributors (Rust transcription) | Structures (including `NV_ENC_CONFIG_HEVC` and its bit-field masks, `NV_ENC_PIC_PARAMS_HEVC`, `NV_ENC_SEI_PAYLOAD`, `NV_ENC_TIME_CODE`), function table, codec / profile GUIDs (H.264, HEVC Main, HEVC Main 10) and constants (`NV_ENC_LEVEL_HEVC_*`, tier, CU size, `NV_ENC_BUFFER_FORMAT_YUV420_10BIT`, `NV_ENC_CAPS_SUPPORT_10BIT_ENCODE`, BT.2020 / PQ / HLG VUI codes) transcribed from `nvEncodeAPI.h`, NVIDIA Video Codec SDK, API 12.1 (https://developer.nvidia.com/video-codec-sdk) | MIT (Copyright (c) 2010-2023 NVIDIA Corporation; notice kept in the file header) |

## Downloaded at runtime

These files are never in the repository or the app bundle. CinemaGrid downloads them into the
per-user data directory (`<data dir>/models/<id>/`) only after the user confirms a dialog that shows
the size, the source URL and the licence. Every file is pinned to a revision and checked against its
SHA-256 (`crates/speech/src/models.rs`, `docs/transcripts.md`).

| Asset | Author | Source | Licence |
|---|---|---|---|
| Whisper tiny / base / small speech-recognition weights (`model.safetensors`, `config.json`, `generation_config.json`, `tokenizer.json`) | OpenAI | `https://huggingface.co/openai/whisper-{tiny,base,small}` (revisions `169d4a43…`, `e37978b9…`, `973afd24…`); weights released with `https://github.com/openai/whisper` | MIT (weights and code, github.com/openai/whisper); the Hugging Face conversion is labelled Apache-2.0 |
