//! Home screen (Import mode): wordmark, import cards, recent projects, community links.
//! This is what Settings ▸ General ▸ At Startup ▸ "Show Home" lands on at launch.

use std::sync::mpsc::{Sender, channel};

use cinemagrid_engine::Session;
use cinemagrid_ui_egui::CinemagridApp;
use cinemagrid_ui_egui::control::ControlRequest;
use egui_kittest::Harness;
use serde_json::Value;
use serde_json::json;

struct Driver {
    harness: Harness<'static, CinemagridApp>,
    tx: Sender<ControlRequest>,
}

impl Driver {
    fn frames(&mut self, n: usize) {
        for _ in 0..n {
            let ctx = self.harness.ctx.clone();
            let mut raw = std::mem::take(self.harness.input_mut());
            eframe::App::raw_input_hook(self.harness.state_mut(), &ctx, &mut raw);
            *self.harness.input_mut() = raw;
            self.harness.step();
        }
    }

    fn new() -> Self {
        let mut session = Session::default();
        // Seed recent projects so the Home rows render (names only; the paths need not exist).
        session.prefs.general.recent_projects =
            vec!["/tmp/a.fcproj".to_string(), "/tmp/nested/b.fcproj".to_string()];
        let (tx, rx) = channel();
        let mut app = CinemagridApp::new(session).with_control(rx);
        assert!(matches!(app.ui.mode, cinemagrid_ui_egui::state::Mode::Edit), "a fresh app starts in Edit mode");
        app.ui.mode = cinemagrid_ui_egui::state::Mode::Import;
        let harness = Harness::builder().with_size(egui::vec2(1600.0, 980.0)).with_max_steps(10_000).build_eframe(move |_cc| app);
        let mut d = Driver { harness, tx };
        d.frames(4);
        d
    }

    /// The full control response, without asserting success.
    fn raw(&mut self, method: &str, params: Value) -> Value {
        let (req, reply) = ControlRequest::new(method, params.clone());
        self.tx.send(req).expect("control channel");
        for _ in 0..600 {
            self.frames(1);
            if let Ok(r) = reply.try_recv() {
                return r;
            }
        }
        panic!("no reply to {method} {params}");
    }

    fn ok(&mut self, method: &str, params: Value) -> Value {
        let r = self.raw(method, params.clone());
        assert_eq!(r["ok"], true, "{method} {params}: {r}");
        r["result"].clone()
    }

    fn ids(&mut self, prefix: &str) -> Vec<String> {
        self.frames(2);
        let v = self.ok("ui.elements", json!({"prefix": prefix}));
        v.as_array().expect("elements").iter().filter_map(|e| e["id"].as_str().map(str::to_string)).collect()
    }
}

#[test]
fn home_screen_shows_cards_recents_and_links() {
    let mut d = Driver::new();
    let ids = d.ids("");
    for want in [
        "header.home",
        "import.file.import",
        "import.file.importDemoFootage",
        "import.file.openDemoProject",
        "import.file.newBarsAndTone",
        "import.recent.0",
        "import.recent.1",
        "import.link.github",
        "import.link.reportIssue",
    ] {
        assert!(ids.iter().any(|i| i == want), "Home screen is missing `{want}` (have {ids:?})");
    }
}

#[test]
fn home_mode_tabs_round_trip() {
    let mut d = Driver::new();
    assert!(!d.ids("import.").is_empty(), "starts on the Home screen");
    d.ok("ui.click", json!({"id": "header.mode.edit"}));
    assert!(d.ids("import.").is_empty(), "Edit mode hides the Home screen");
    d.ok("ui.click", json!({"id": "header.home"}));
    assert!(!d.ids("import.").is_empty(), "the Home button returns to the Home screen");
}

#[test]
fn clicking_a_missing_recent_project_errors_without_crashing() {
    let mut d = Driver::new();
    // The seeded /tmp/a.fcproj does not exist: the open fails, the error reaches the
    // status bar, and the Home screen stays up (rule 0: no crash, no lost work).
    d.raw("ui.click", json!({"id": "import.recent.0"}));
    d.frames(2);
    assert!(!d.ids("import.").is_empty(), "the Home screen survives the failed open");
    assert!(!d.harness.state().ui.status.is_empty(), "the failed open is reported in the status bar");
}
