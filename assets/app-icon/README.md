# CinemaGrid app icon

**Artwork:** a dark cinema canvas with viewfinder corner brackets, a sweeping C-G monogram over
timeline clips, a backdrop grid and a playhead.

## Palette

| Colour | Hex | Used for |
|---|---|---|
| Canvas | `#0f111d` | the full-bleed gradient field behind the mark |
| Violet | `#c084fc` | the leading edge of the C-G monogram arc |
| Indigo | `#818cf8` | the middle of the arc |
| Sky | `#38bdf8` | the tail of the arc |
| Gold | `#fde047` | the playhead |
| Ruby | `#e11d48` | the clip accents |

## Geometry and style

- A 512-unit viewBox tile, rounded square `rx=112`, full bleed (no frame or border).
- The monogram, timeline clips and playhead sit inside a viewfinder frame on a subtle grid.
- macOS renders (`cinemagrid.icns`, `cinemagrid-macos-512.png`) put the tile in Apple's grid (824 of
  1024 px, transparent margin). Windows, Linux and the web use the full-bleed tile.

## Provenance

Original work for CinemaGrid by @BORAVELLISARIKAREDDY, vectorised from the canonical
`cinemagrid.svg`. Licence: [LICENSE.txt](LICENSE.txt) (MIT OR Apache-2.0).

## Files

| File | What |
|---|---|
| `cinemagrid.svg` | canonical artwork |
| `cinemagrid-small.svg` | lighter trace of the same drawing, for when size matters |
| `cinemagrid-1024.png` | 1024 px render |
| `cinemagrid-macos-512.png` | runtime Dock icon on macOS (embedded by `apps/cinemagrid/src/main.rs`) |
| `cinemagrid.icns` | macOS bundle icon (`CFBundleIconFile`) |
| `cinemagrid.ico` | Windows icon, 16–256 px (embedded in `cinemagrid.exe` by `apps/cinemagrid/build.rs`) |
| `hicolor/<size>/apps/io.github.boravellisarikareddy.cinemagrid.png`, `hicolor/scalable/…svg` | Linux icon theme, used by `packaging/linux/io.github.boravellisarikareddy.cinemagrid.desktop` |

The web app's `apps/cinemagrid-web/web/favicon.png` (128 px) comes from the same artwork.

## How the icon reaches each OS

- **macOS:** the window icon set at startup (`ViewportBuilder::with_icon`) is the Dock and app-switcher
  icon when the app runs unbundled. A future `.app` bundle points `CFBundleIconFile` at `cinemagrid.icns`.
- **Windows:** `build.rs` embeds `cinemagrid.ico` as the exe's resource icon (Explorer, Start menu,
  pinned taskbar), and the runtime icon covers the window, taskbar and Alt-Tab.
- **Linux:** the runtime icon plus `with_app_id("io.github.boravellisarikareddy.cinemagrid")`, which Wayland
  matches to the `.desktop` file. Install the `hicolor/` tree under `/usr/share/icons/hicolor/` and the
  desktop file under `/usr/share/applications/`.

## Regenerate

`packaging/icons.sh` (needs `resvg`; `iconutil` on macOS for the `.icns`; the `.ico` is packed by
`cargo xtask ico`). To change the artwork, replace `cinemagrid.svg` and `cinemagrid-small.svg`, then run
the script. Every derived file needs its `.attribution` sidecar and a row in `ATTRIBUTION.md`.
