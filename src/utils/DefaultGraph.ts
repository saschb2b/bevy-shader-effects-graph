/**
 * Simple default graph demonstrating the new artist-friendly nodes
 * Just 2 nodes: Explosion Effect -> Final Output
 */
export const defaultGraph = {
  last_node_id: 3,
  last_link_id: 2,
  nodes: [
    // Explosion Effect Node - does all the work!
    {
      id: 1,
      type: 'shader/effect/explosion',
      pos: [150, 150],
      size: [200, 130],
      flags: {},
      order: 0,
      mode: 0,
      inputs: [
        { name: 'Position', type: 'vec2', link: null },
        { name: 'Color', type: 'vec3', link: null },
        { name: 'Speed', type: 'float', link: null },
        { name: 'Size', type: 'float', link: null },
      ],
      outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
      properties: { speed: 0.5, size: 0.4, thickness: 0.08 },
      widgets_values: [0.5, 0.4, 0.08],
    },
    // Final Output Node
    {
      id: 2,
      type: 'shader/output/final',
      pos: [450, 180],
      size: [160, 30],
      flags: {},
      order: 1,
      mode: 0,
      inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
      properties: {},
    },
  ],
  links: [
    [1, 1, 0, 2, 0, 'vec4'], // Explosion Result -> Output Color
  ],
  groups: [],
  config: {},
  extra: {},
  version: 0.5,
};

/**
 * Alternative example graphs for different effects
 */

// Water splash - also just 2 nodes!
export const waterSplashGraph = {
  last_node_id: 2,
  last_link_id: 1,
  nodes: [
    {
      id: 1,
      type: 'shader/effect/water_splash',
      pos: [150, 150],
      size: [200, 110],
      flags: {},
      order: 0,
      mode: 0,
      inputs: [
        { name: 'Position', type: 'vec2', link: null },
        { name: 'Color', type: 'vec3', link: null },
        { name: 'Speed', type: 'float', link: null },
      ],
      outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
      properties: { speed: 1.0, rings: 3, decay: 0.5 },
    },
    {
      id: 2,
      type: 'shader/output/final',
      pos: [450, 180],
      size: [160, 30],
      flags: {},
      order: 1,
      mode: 0,
      inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
      properties: {},
    },
  ],
  links: [[1, 1, 0, 2, 0, 'vec4']],
  groups: [],
  config: {},
  extra: {},
  version: 0.5,
};

// Healing aura - 2 nodes
export const healingAuraGraph = {
  last_node_id: 2,
  last_link_id: 1,
  nodes: [
    {
      id: 1,
      type: 'shader/effect/healing_aura',
      pos: [150, 150],
      size: [200, 110],
      flags: {},
      order: 0,
      mode: 0,
      inputs: [
        { name: 'Position', type: 'vec2', link: null },
        { name: 'Color', type: 'vec3', link: null },
      ],
      outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
      properties: { pulseSpeed: 2.0, innerGlow: 0.3, outerGlow: 0.5 },
    },
    {
      id: 2,
      type: 'shader/output/final',
      pos: [450, 180],
      size: [160, 30],
      flags: {},
      order: 1,
      mode: 0,
      inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
      properties: {},
    },
  ],
  links: [[1, 1, 0, 2, 0, 'vec4']],
  groups: [],
  config: {},
  extra: {},
  version: 0.5,
};

// Fire effect - 2 nodes
export const fireGraph = {
  last_node_id: 2,
  last_link_id: 1,
  nodes: [
    {
      id: 1,
      type: 'shader/effect/fire',
      pos: [150, 150],
      size: [200, 110],
      flags: {},
      order: 0,
      mode: 0,
      inputs: [{ name: 'Position', type: 'vec2', link: null }],
      outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
      properties: { intensity: 1.0, speed: 3.0, height: 0.4 },
    },
    {
      id: 2,
      type: 'shader/output/final',
      pos: [450, 180],
      size: [160, 30],
      flags: {},
      order: 1,
      mode: 0,
      inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
      properties: {},
    },
  ],
  links: [[1, 1, 0, 2, 0, 'vec4']],
  groups: [],
  config: {},
  extra: {},
  version: 0.5,
};

// Portal effect - 2 nodes
export const portalGraph = {
  last_node_id: 2,
  last_link_id: 1,
  nodes: [
    {
      id: 1,
      type: 'shader/effect/portal',
      pos: [150, 150],
      size: [200, 110],
      flags: {},
      order: 0,
      mode: 0,
      inputs: [
        { name: 'Position', type: 'vec2', link: null },
        { name: 'Color A', type: 'vec3', link: null },
        { name: 'Color B', type: 'vec3', link: null },
      ],
      outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
      properties: { speed: 1.0, twist: 3.0, radius: 0.3 },
    },
    {
      id: 2,
      type: 'shader/output/final',
      pos: [450, 180],
      size: [160, 30],
      flags: {},
      order: 1,
      mode: 0,
      inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
      properties: {},
    },
  ],
  links: [[1, 1, 0, 2, 0, 'vec4']],
  groups: [],
  config: {},
  extra: {},
  version: 0.5,
};
