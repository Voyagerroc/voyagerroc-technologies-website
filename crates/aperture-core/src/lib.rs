//! Aperture Core: High-performance 3D Kinematics and Motion State Engine for Voyagerroc Technologies
//!
//! Compiled to WebAssembly for deterministic, zero-allocation, zero-copy animation computation.

pub mod facets;
pub mod heart;
pub mod math;
pub mod nodes;
pub mod state;
pub mod wings;

use facets::AgenticFacets;
use heart::HeartTransform;
use math::lerp;
use nodes::OrbitalNodes;
use state::ApertureState;
use wings::PhoenixWings;

use std::f32::consts::PI;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ApertureEngine {
    state: ApertureState,
    nodes_engine: OrbitalNodes,
    facets_engine: AgenticFacets,
    time: f32,
    smooth_x: f32,
    smooth_y: f32,
    progress: f32,
    camera_z: f32,
}

impl Default for ApertureEngine {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl ApertureEngine {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            state: ApertureState::default(),
            nodes_engine: OrbitalNodes::new(),
            facets_engine: AgenticFacets::new(),
            time: 0.0,
            smooth_x: 0.0,
            smooth_y: 0.0,
            progress: 0.0,
            camera_z: 10.5,
        }
    }

    /// Advance motion kinematics by `delta_time` seconds and update the linear state buffer.
    pub fn tick(
        &mut self,
        dt: f32,
        ptr_x: f32,
        ptr_y: f32,
        focus_id: i32,
        story_active: bool,
        story_progress: f32,
        story_index: i32,
        fit_distance: f32,
        instant: bool,
        reduced_motion: bool,
    ) {
        // Advance internal time
        let speed_multiplier = if reduced_motion { 0.4 } else { 1.0 };
        self.time += dt.min(0.08) * speed_multiplier;

        let l = if instant { 1.0 } else { 0.055 };
        let active_domain = if story_active { story_index } else { focus_id };

        // Lerp interactive pointer and scroll progress
        self.progress = lerp(self.progress, story_progress, l);
        self.smooth_x = lerp(self.smooth_x, ptr_x, l);
        self.smooth_y = lerp(self.smooth_y, ptr_y, l);

        let is_domain_focused = active_domain >= 0;
        let target_angle = if is_domain_focused {
            (active_domain as f32 * PI * 2.0) / 5.0 - PI / 2.0
        } else {
            0.0
        };

        let domain_bias_x = if is_domain_focused { target_angle.cos() * 0.09 } else { 0.0 };
        let domain_bias_y = if is_domain_focused { target_angle.sin() * 0.06 } else { 0.0 };

        // 1. Sculpture Group Rotation
        let story_pitch = if story_active { -0.1 + self.progress * 0.18 } else { 0.0 };
        let sculpture_rot_y = -0.18 + self.smooth_x * 0.22 + domain_bias_x + (self.time * 0.14).sin() * 0.08;
        let sculpture_rot_x = 0.14 + self.smooth_y * 0.14 + domain_bias_y + story_pitch;
        let sculpture_rot_z = (self.time * 0.1).sin() * 0.03;
        self.state.sculpture_rot = [sculpture_rot_x, sculpture_rot_y, sculpture_rot_z];

        // 2. Wings Kinematics
        let wings = PhoenixWings::compute(self.time, self.progress, story_active);
        self.state.left_wing = [wings.left.scale, wings.left.rot_y, wings.left.rot_z];
        self.state.right_wing = [wings.right.scale, wings.right.rot_y, wings.right.rot_z];

        // 3. Heart Kinematics
        let heart = HeartTransform::compute(self.time, story_active, is_domain_focused);
        self.state.heart = [heart.scale, heart.rot_y, heart.emissive_intensity];

        // 4. Orbital Product Nodes
        self.state.nodes = self.nodes_engine.compute(self.time, active_domain);

        // 5. Crystalline Agentic Facets
        self.state.facets = self.facets_engine.compute(
            self.time,
            is_domain_focused,
            domain_bias_x,
            domain_bias_y,
        );

        // 6. Camera distance and Telemetry
        let target_camera_z = if story_active { fit_distance * 0.94 } else { fit_distance };
        self.camera_z = lerp(self.camera_z, target_camera_z, l);

        self.state.telemetry = [
            self.camera_z,
            self.time,
            self.progress,
            active_domain as f32,
        ];
    }

    /// Return raw pointer to the start of the state buffer for zero-copy JavaScript `Float32Array`.
    pub fn state_ptr(&self) -> *const f32 {
        &self.state as *const _ as *const f32
    }

    /// Total number of f32 entries in the continuous state buffer.
    pub fn state_floats(&self) -> usize {
        ApertureState::FLOAT_COUNT
    }

    /// Current simulation time.
    pub fn time(&self) -> f32 {
        self.time
    }

    /// Reset or override time (e.g. for deterministic testing or context restores).
    pub fn set_time(&mut self, time: f32) {
        self.time = time;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_engine_initialization() {
        let engine = ApertureEngine::new();
        assert_eq!(engine.state_floats(), 77);
        assert_eq!(engine.time(), 0.0);
    }

    #[test]
    fn test_engine_tick_progression() {
        let mut engine = ApertureEngine::new();
        engine.tick(0.016, 0.5, -0.2, 1, false, 0.0, 0, 10.5, false, false);
        assert!(engine.time() > 0.015);

        let ptr = engine.state_ptr();
        assert!(!ptr.is_null());

        // Check telemetry
        let time_val = engine.state.telemetry[1];
        assert_eq!(time_val, engine.time());
        let domain_val = engine.state.telemetry[3];
        assert_eq!(domain_val, 1.0);
    }

    #[test]
    fn test_engine_reduced_motion() {
        let mut normal_engine = ApertureEngine::new();
        normal_engine.tick(0.05, 0.0, 0.0, -1, false, 0.0, 0, 10.5, false, false);

        let mut reduced_engine = ApertureEngine::new();
        reduced_engine.tick(0.05, 0.0, 0.0, -1, false, 0.0, 0, 10.5, false, true);

        assert!((reduced_engine.time() - normal_engine.time() * 0.4).abs() < 1e-5);
    }
}
