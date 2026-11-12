//! Phoenix ember heart organic breathing pulsation and luminescence

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct HeartTransform {
    pub scale: f32,
    pub rot_y: f32,
    pub emissive_intensity: f32,
}

impl HeartTransform {
    pub fn compute(time: f32, story_active: bool, is_domain_focused: bool) -> Self {
        // Organic double-frequency breathing wave: 4th power sine for sharp systole + lower sine for diastole
        let s1 = (time * 1.6).sin();
        let s2 = (time * 0.8).sin();
        let heart_pulse = s1.powi(4) * 0.18 + s2 * 0.05;

        let story_boost = if story_active { 0.22 } else { 0.0 };
        let focus_boost = if is_domain_focused { 0.12 } else { 0.0 };

        let scale = 1.0 + heart_pulse + story_boost + focus_boost;
        let rot_y = time * 0.7;

        let emissive_intensity = 0.85 + heart_pulse * 1.4 + if is_domain_focused { 0.5 } else { 0.0 };

        Self {
            scale,
            rot_y,
            emissive_intensity,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_heart_pulse_values() {
        for step in 0..100 {
            let t = step as f32 * 0.05;
            let heart = HeartTransform::compute(t, false, false);
            // Scale should stay in a healthy organic expansion/contraction range around 0.9 to 1.3
            assert!(heart.scale > 0.85 && heart.scale < 1.35);
            // Emissive intensity should stay bright and positive
            assert!(heart.emissive_intensity > 0.6 && heart.emissive_intensity < 2.0);
        }
    }

    #[test]
    fn test_heart_focus_emission_boost() {
        let t = 2.5;
        let unfocused = HeartTransform::compute(t, false, false);
        let focused = HeartTransform::compute(t, false, true);
        assert!(focused.emissive_intensity > unfocused.emissive_intensity);
        assert!((focused.emissive_intensity - unfocused.emissive_intensity - 0.5).abs() < 1e-6);
        assert!(focused.scale > unfocused.scale);
    }
}
