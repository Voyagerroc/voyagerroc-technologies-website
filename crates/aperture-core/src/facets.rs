//! Crystalline agentic facets (01 Context, 02 Tool Execution, 03 Human-in-the-loop) floatation and alignment

pub const NUM_FACETS: usize = 3;

#[repr(C)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct FacetOutput {
    pub pos: [f32; 3],
    pub rot: [f32; 3],
    pub scale: f32,
}

#[derive(Debug, Clone, Copy)]
pub struct FacetConfig {
    pub base_pos: [f32; 3],
    pub rx: f32,
    pub ry: f32,
    pub speed: f32,
}

pub struct AgenticFacets {
    configs: [FacetConfig; NUM_FACETS],
}

impl Default for AgenticFacets {
    fn default() -> Self {
        Self::new()
    }
}

impl AgenticFacets {
    pub fn new() -> Self {
        Self {
            configs: [
                FacetConfig {
                    base_pos: [-1.75, 0.9, 0.55],
                    rx: 0.25,
                    ry: 0.35,
                    speed: 0.28,
                },
                FacetConfig {
                    base_pos: [1.85, -0.65, 0.45],
                    rx: -0.2,
                    ry: 0.45,
                    speed: -0.24,
                },
                FacetConfig {
                    base_pos: [0.0, -1.8, -0.3],
                    rx: 0.4,
                    ry: -0.25,
                    speed: 0.32,
                },
            ],
        }
    }

    pub fn compute(
        &self,
        time: f32,
        is_domain_focused: bool,
        domain_bias_x: f32,
        domain_bias_y: f32,
    ) -> [FacetOutput; NUM_FACETS] {
        let mut outputs = [FacetOutput {
            pos: [0.0; 3],
            rot: [0.0; 3],
            scale: 1.0,
        }; NUM_FACETS];

        let scale = if is_domain_focused { 1.15 } else { 1.0 };
        let bias_x = if is_domain_focused { domain_bias_x * 0.5 } else { 0.0 };
        let bias_y = if is_domain_focused { domain_bias_y * 0.5 } else { 0.0 };

        for (idx, (cfg, out)) in self.configs.iter().zip(outputs.iter_mut()).enumerate() {
            let f_pulse = (time * cfg.speed + idx as f32 * 1.8).sin() * 0.07;

            let pos = [
                cfg.base_pos[0] + bias_x,
                cfg.base_pos[1] + f_pulse + bias_y,
                cfg.base_pos[2],
            ];

            let rot = [
                cfg.rx + (time * 0.35 + idx as f32).sin() * 0.12,
                cfg.ry + time * cfg.speed * 0.5,
                0.0,
            ];

            *out = FacetOutput { pos, rot, scale };
        }

        outputs
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_facets_flotation_range() {
        let facets = AgenticFacets::new();
        for step in 0..100 {
            let t = step as f32 * 0.1;
            let outs = facets.compute(t, false, 0.0, 0.0);
            for (cfg, out) in facets.configs.iter().zip(outs.iter()) {
                assert!((out.pos[1] - cfg.base_pos[1]).abs() <= 0.07001);
                assert!((out.pos[0] - cfg.base_pos[0]).abs() < 1e-6);
                assert_eq!(out.scale, 1.0);
            }
        }
    }

    #[test]
    fn test_domain_bias_shift() {
        let facets = AgenticFacets::new();
        let bias_x = 0.08;
        let bias_y = 0.04;
        let outs = facets.compute(0.0, true, bias_x, bias_y);
        for (cfg, out) in facets.configs.iter().zip(outs.iter()) {
            assert!((out.pos[0] - (cfg.base_pos[0] + bias_x * 0.5)).abs() < 1e-6);
            assert_eq!(out.scale, 1.15);
        }
    }
}
