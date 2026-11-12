//! Math utilities for Aperture Kinematics (Bézier curves, lerp, and trigonometric operations)

/// Linear interpolation between `a` and `b` by factor `t`.
#[inline]
pub fn lerp(a: f32, b: f32, t: f32) -> f32 {
    a + (b - a) * t
}

/// 1D Cubic Bézier calculation at parameter `t` in [0.0, 1.0].
#[inline]
pub fn cubic_bezier_1d(p0: f32, p1: f32, p2: f32, p3: f32, t: f32) -> f32 {
    let t = t.clamp(0.0, 1.0);
    let u = 1.0 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;

    uuu * p0 + 3.0 * uu * t * p1 + 3.0 * u * tt * p2 + ttt * p3
}

/// 3D Cubic Bézier calculation for a point at parameter `t`.
#[inline]
pub fn cubic_bezier_3d(p0: [f32; 3], p1: [f32; 3], p2: [f32; 3], p3: [f32; 3], t: f32) -> [f32; 3] {
    [
        cubic_bezier_1d(p0[0], p1[0], p2[0], p3[0], t),
        cubic_bezier_1d(p0[1], p1[1], p2[1], p3[1], t),
        cubic_bezier_1d(p0[2], p1[2], p2[2], p3[2], t),
    ]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_lerp_endpoints() {
        assert!((lerp(10.0, 20.0, 0.0) - 10.0).abs() < 1e-6);
        assert!((lerp(10.0, 20.0, 1.0) - 20.0).abs() < 1e-6);
        assert!((lerp(10.0, 20.0, 0.5) - 15.0).abs() < 1e-6);
    }

    #[test]
    fn test_cubic_bezier_endpoints() {
        let p0 = [1.0, 2.0, 3.0];
        let p1 = [2.0, 3.0, 4.0];
        let p2 = [3.0, 4.0, 5.0];
        let p3 = [4.0, 5.0, 6.0];

        let start = cubic_bezier_3d(p0, p1, p2, p3, 0.0);
        assert!((start[0] - 1.0).abs() < 1e-6);
        assert!((start[1] - 2.0).abs() < 1e-6);
        assert!((start[2] - 3.0).abs() < 1e-6);

        let end = cubic_bezier_3d(p0, p1, p2, p3, 1.0);
        assert!((end[0] - 4.0).abs() < 1e-6);
        assert!((end[1] - 5.0).abs() < 1e-6);
        assert!((end[2] - 6.0).abs() < 1e-6);
    }

    #[test]
    fn test_cubic_bezier_midpoint() {
        let p0 = 0.0;
        let p1 = 1.0;
        let p2 = 1.0;
        let p3 = 0.0;
        // At t=0.5: 0.125*0 + 3*0.25*0.5*1 + 3*0.5*0.25*1 + 0.125*0 = 0.375 + 0.375 = 0.75
        let mid = cubic_bezier_1d(p0, p1, p2, p3, 0.5);
        assert!((mid - 0.75).abs() < 1e-6);
    }
}
