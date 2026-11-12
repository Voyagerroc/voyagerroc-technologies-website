//! Phoenix wing flapping, elevation (scroll lift), and symmetrical transformation kinematics

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct WingTransform {
    pub scale: f32,
    pub rot_y: f32,
    pub rot_z: f32,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct PhoenixWings {
    pub left: WingTransform,
    pub right: WingTransform,
}

impl PhoenixWings {
    pub fn compute(time: f32, progress: f32, story_active: bool) -> Self {
        let scroll_lift = if story_active {
            0.32 + progress * 0.48
        } else {
            0.0
        };

        let wing_span = if story_active {
            1.08 + progress * 0.45
        } else {
            1.0
        };

        let wing_flap = (time * 1.8).sin() * 0.05;
        let story_y_offset = if story_active { progress * 0.35 } else { 0.0 };

        let left = WingTransform {
            scale: wing_span,
            rot_y: -0.12 - story_y_offset,
            rot_z: -wing_flap + scroll_lift,
        };

        let right = WingTransform {
            scale: wing_span,
            rot_y: 0.12 + story_y_offset,
            rot_z: wing_flap - scroll_lift,
        };

        Self { left, right }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_wing_flapping_bounds() {
        for step in 0..100 {
            let t = step as f32 * 0.1;
            let wings = PhoenixWings::compute(t, 0.0, false);
            assert!(wings.left.rot_z >= -0.05001 && wings.left.rot_z <= 0.05001);
            assert!(wings.right.rot_z >= -0.05001 && wings.right.rot_z <= 0.05001);
            assert!((wings.left.scale - 1.0).abs() < 1e-6);
        }
    }

    #[test]
    fn test_scroll_lift_monotonicity() {
        let mut prev_lift = 0.0;
        for step in 0..10 {
            let p = step as f32 / 10.0;
            let wings = PhoenixWings::compute(0.0, p, true);
            let lift = wings.left.rot_z; // at t=0, wing_flap = 0, so rot_z == scroll_lift
            assert!(lift >= prev_lift);
            prev_lift = lift;
        }
    }

    #[test]
    fn test_left_right_symmetry() {
        let wings = PhoenixWings::compute(1.234, 0.5, true);
        assert!((wings.left.scale - wings.right.scale).abs() < 1e-6);
        // rot_z is anti-symmetric: left.rot_z = -wing_flap + scroll_lift; right.rot_z = wing_flap - scroll_lift
        assert!((wings.left.rot_z + wings.right.rot_z).abs() < 1e-6);
        // rot_y is symmetric magnitude with opposite signs
        assert!((wings.left.rot_y + wings.right.rot_y).abs() < 1e-6);
    }
}
