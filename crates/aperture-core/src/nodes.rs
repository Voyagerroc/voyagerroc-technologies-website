//! Orbital domain nodes (5 product areas) and Bézier energy track simulation

use crate::math::cubic_bezier_3d;
use std::f32::consts::PI;

pub const NUM_NODES: usize = 5;
pub const HEART_ENDPOINT: [f32; 3] = [0.08, 0.25, 0.24];

#[repr(C)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct NodeOutput {
    pub scale: f32,
    pub emissive_intensity: f32,
    pub track_opacity: f32,
    pub pulse_scale: f32,
    pub pulse_pos: [f32; 3],
    pub pulse_visible: f32,
}

pub struct OrbitalNodes {
    base_positions: [[f32; 3]; NUM_NODES],
    ctrl1_positions: [[f32; 3]; NUM_NODES],
    ctrl2_positions: [[f32; 3]; NUM_NODES],
}

impl Default for OrbitalNodes {
    fn default() -> Self {
        Self::new()
    }
}

impl OrbitalNodes {
    pub fn new() -> Self {
        let mut base = [[0.0; 3]; NUM_NODES];
        let mut c1 = [[0.0; 3]; NUM_NODES];
        let mut c2 = [[0.0; 3]; NUM_NODES];

        let radius = 2.65;
        for i in 0..NUM_NODES {
            let angle = (i as f32 * PI * 2.0) / 5.0 - PI / 2.0;
            let np = [
                angle.cos() * radius,
                angle.sin() * 0.7 - 0.2,
                angle.sin() * radius * 0.55,
            ];
            base[i] = np;
            c1[i] = [np[0] * 0.6, np[1] * 0.6 + 0.3, np[2] * 0.6];
            c2[i] = [np[0] * 0.25, np[1] * 0.3 + 0.4, np[2] * 0.3];
        }

        Self {
            base_positions: base,
            ctrl1_positions: c1,
            ctrl2_positions: c2,
        }
    }

    #[inline]
    pub fn base_pos(&self, idx: usize) -> [f32; 3] {
        self.base_positions[idx]
    }

    pub fn compute(&self, time: f32, focus_id: i32) -> [NodeOutput; NUM_NODES] {
        let mut outputs = [NodeOutput {
            scale: 1.0,
            emissive_intensity: 0.6,
            track_opacity: 0.28,
            pulse_scale: 1.0,
            pulse_pos: [0.0; 3],
            pulse_visible: 1.0,
        }; NUM_NODES];

        for (i, output) in outputs.iter_mut().enumerate() {
            let is_focused = focus_id == i as i32;
            let is_active = focus_id < 0 || is_focused;

            let scale = if is_focused {
                2.0
            } else if is_active {
                1.1
            } else {
                0.65
            };

            let emissive_intensity = if is_focused {
                1.4
            } else if is_active {
                0.6
            } else {
                0.15
            };

            let track_opacity = if is_focused {
                0.85
            } else if is_active {
                0.28
            } else {
                0.05
            };

            let pulse_speed = if is_focused { 0.35 } else { 0.12 };
            let raw_t = time * pulse_speed + (i as f32) * 0.2;
            let pulse_t = raw_t.rem_euclid(1.0);

            let pulse_pos = cubic_bezier_3d(
                self.base_positions[i],
                self.ctrl1_positions[i],
                self.ctrl2_positions[i],
                HEART_ENDPOINT,
                pulse_t,
            );

            let pulse_scale = if is_focused { 2.2 } else { 1.0 };
            let pulse_visible = if is_active { 1.0 } else { 0.0 };

            *output = NodeOutput {
                scale,
                emissive_intensity,
                track_opacity,
                pulse_scale,
                pulse_pos,
                pulse_visible,
            };
        }

        outputs
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_five_nodes_pentagonal_distribution() {
        let nodes = OrbitalNodes::new();
        for i in 0..NUM_NODES {
            let p = nodes.base_pos(i);
            // Distance in xz-plane should be bounded within [0, 2.7]
            let planar_dist = (p[0] * p[0] + p[2] * p[2]).sqrt();
            assert!(planar_dist > 0.1 && planar_dist < 2.7);
        }
    }

    #[test]
    fn test_pulse_traversal_cycle() {
        let nodes = OrbitalNodes::new();
        let out = nodes.compute(10.0, -1);
        for n in &out {
            assert!(n.pulse_pos[0].is_finite());
            assert!(n.pulse_pos[1].is_finite());
            assert!(n.pulse_pos[2].is_finite());
            assert_eq!(n.pulse_visible, 1.0);
        }
    }

    #[test]
    fn test_focused_node_prominence() {
        let nodes = OrbitalNodes::new();
        let out = nodes.compute(1.0, 2);
        assert!((out[2].scale - 2.0).abs() < 1e-6);
        assert!((out[2].emissive_intensity - 1.4).abs() < 1e-6);
        assert!((out[2].track_opacity - 0.85).abs() < 1e-6);
        assert!((out[2].pulse_scale - 2.2).abs() < 1e-6);

        // Non-focused node should be dimmed when focus is set
        assert!((out[0].scale - 0.65).abs() < 1e-6);
        assert!((out[0].pulse_visible - 0.0).abs() < 1e-6);
    }
}
