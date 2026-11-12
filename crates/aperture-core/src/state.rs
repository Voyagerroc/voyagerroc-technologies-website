//! Contiguous C-ABI memory buffer layout for zero-copy JavaScript WebAssembly interop

use crate::facets::{FacetOutput, NUM_FACETS};
use crate::nodes::{NodeOutput, NUM_NODES};

#[repr(C)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct ApertureState {
    /// Sculpture group rotation in radians: [rx, ry, rz]
    pub sculpture_rot: [f32; 3],

    /// Left wing transform: [scale, rot_y, rot_z]
    pub left_wing: [f32; 3],

    /// Right wing transform: [scale, rot_y, rot_z]
    pub right_wing: [f32; 3],

    /// Heart transform & glow: [scale, rot_y, emissive_intensity]
    pub heart: [f32; 3],

    /// 5 Orbital domain nodes: 8 floats each
    /// [scale, emissive_intensity, track_opacity, pulse_scale, pulse_x, pulse_y, pulse_z, pulse_visible]
    pub nodes: [NodeOutput; NUM_NODES],

    /// 3 Crystalline facets: 7 floats each
    /// [pos_x, pos_y, pos_z, rot_x, rot_y, rot_z, scale]
    pub facets: [FacetOutput; NUM_FACETS],

    /// Telemetry & Camera: [camera_z, animation_time, scroll_progress, selected_domain_float]
    pub telemetry: [f32; 4],
}

impl Default for ApertureState {
    fn default() -> Self {
        Self {
            sculpture_rot: [0.14, -0.2, 0.0],
            left_wing: [1.0, -0.12, 0.0],
            right_wing: [1.0, 0.12, 0.0],
            heart: [1.0, 0.0, 0.85],
            nodes: [NodeOutput {
                scale: 1.0,
                emissive_intensity: 0.6,
                track_opacity: 0.28,
                pulse_scale: 1.0,
                pulse_pos: [0.0; 3],
                pulse_visible: 1.0,
            }; NUM_NODES],
            facets: [FacetOutput {
                pos: [0.0; 3],
                rot: [0.0; 3],
                scale: 1.0,
            }; NUM_FACETS],
            telemetry: [10.5, 0.0, 0.0, -1.0],
        }
    }
}

impl ApertureState {
    pub const FLOAT_COUNT: usize = std::mem::size_of::<Self>() / std::mem::size_of::<f32>();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_memory_layout_alignment() {
        assert_eq!(
            std::mem::size_of::<ApertureState>(),
            ApertureState::FLOAT_COUNT * std::mem::size_of::<f32>()
        );
        assert_eq!(ApertureState::FLOAT_COUNT, 77);
    }
}
