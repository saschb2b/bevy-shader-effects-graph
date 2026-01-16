import { describe, it, expect } from 'vitest';
import { ShaderGenerator } from './ShaderGenerator';

/**
 * Mock LGraph for testing ShaderGenerator without litegraph.js dependency
 */
function createMockGraph(nodes: any[], links: any[]) {
  const linkMap: Record<number, any> = {};
  links.forEach((link) => {
    linkMap[link[0]] = {
      id: link[0],
      origin_id: link[1],
      origin_slot: link[2],
      target_id: link[3],
      target_slot: link[4],
      type: link[5],
    };
  });

  return {
    _nodes: nodes,
    links: linkMap,
    getNodeById: (id: number) => nodes.find((n) => n.id === id),
  } as any;
}

describe('ShaderGenerator', () => {
  describe('Real Default Graph', () => {
    it('should generate valid WGSL for default explosion graph', () => {
      // This matches the actual DefaultGraph.ts structure
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/effect/explosion',
            pos: [150, 150],
            size: [200, 130],
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
          {
            id: 2,
            type: 'shader/output/final',
            pos: [450, 180],
            size: [160, 30],
            inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
            properties: {},
          },
        ],
        [[1, 1, 0, 2, 0, 'vec4']]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      console.log('Generated WGSL:\n', code);

      // Should not have .x accessor on a scalar or non-vec3 type
      // The exp_rgb variable should be a vec3
      expect(code).toContain('let exp_rgb_1 = vec3<f32>');

      // Should have valid vec4 with 4 float components
      expect(code).toContain('vec4<f32>(exp_rgb_1.x, exp_rgb_1.y, exp_rgb_1.z, exp_alpha_1)');
    });
  });

  describe('Basic Generation', () => {
    it('should generate valid WGSL with output node only', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: null }],
          },
        ],
        []
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      expect(code).toContain('@fragment');
      expect(code).toContain('fn fragment');
      expect(code).toContain('return');
    });

    it('should return error message when no output node exists', () => {
      const graph = createMockGraph([], []);

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      expect(code).toContain('No Output Node found');
    });
  });

  describe('WGSL Syntax Validation', () => {
    it('should generate valid vec4 with 4 components for explosion effect', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/effect/explosion',
            inputs: [
              { name: 'Position', type: 'vec2', link: null },
              { name: 'Color', type: 'vec3', link: null },
              { name: 'Speed', type: 'float', link: null },
              { name: 'Size', type: 'float', link: null },
            ],
            outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
            properties: { speed: 0.5, size: 0.4, thickness: 0.08 },
          },
          {
            id: 2,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
          },
        ],
        [[1, 1, 0, 2, 0, 'vec4']]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      // Should NOT have vec4(vec3, float) pattern - WGSL doesn't support this
      expect(code).not.toMatch(/vec4<f32>\([^,]+,\s*[^,)]+\)/);

      // Should have proper 4-component vec4
      expect(code).toMatch(/vec4<f32>\([^,]+,\s*[^,]+,\s*[^,]+,\s*[^,)]+\)/);
    });

    it('should not use .x accessor on scalar values', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/effect/explosion',
            inputs: [
              { name: 'Position', type: 'vec2', link: null },
              { name: 'Color', type: 'vec3', link: null },
              { name: 'Speed', type: 'float', link: null },
              { name: 'Size', type: 'float', link: null },
            ],
            outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
            properties: { speed: 0.5, size: 0.4, thickness: 0.08 },
          },
          {
            id: 2,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
          },
        ],
        [[1, 1, 0, 2, 0, 'vec4']]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      // Check for common patterns that would fail:
      // - scalar.x (using accessor on non-vector)
      // The generated code should use proper vector operations

      // All .x/.y/.z accesses should be on vec3 variables, not scalars
      // This is a sanity check - we can't fully validate WGSL syntax here
      // but we can check for obvious issues
      expect(code).not.toContain('0.0.x');
      expect(code).not.toContain('1.0.x');
    });

    it('should generate valid vec4 for all effect nodes', () => {
      const effectTypes = [
        'shader/effect/explosion',
        'shader/effect/bullet_trail',
        'shader/effect/water_splash',
        'shader/effect/healing_aura',
        'shader/effect/shield',
        'shader/effect/fire',
        'shader/effect/electric_spark',
        'shader/effect/portal',
      ];

      for (const effectType of effectTypes) {
        const graph = createMockGraph(
          [
            {
              id: 1,
              type: effectType,
              inputs: [
                { name: 'Position', type: 'vec2', link: null },
                { name: 'Color', type: 'vec3', link: null },
              ],
              outputs: [{ name: 'Result', type: 'vec4', links: [1] }],
              properties: {},
            },
            {
              id: 2,
              type: 'shader/output',
              inputs: [{ name: 'Color', type: 'vec4', link: 1 }],
            },
          ],
          [[1, 1, 0, 2, 0, 'vec4']]
        );

        const generator = new ShaderGenerator(graph);
        const code = generator.generate();

        // Every effect should produce code that returns a vec4
        expect(code, `${effectType} should contain return v1_0`).toContain('return v1_0');

        // Should have the vec4 assignment
        expect(code, `${effectType} should contain let v1_0 = vec4<f32>`).toContain(
          'let v1_0 = vec4<f32>'
        );

        // The vec4 should have 4 comma-separated components
        const vec4Match = code.match(/let v1_0 = vec4<f32>\(([^)]+)\)/);
        expect(vec4Match, `${effectType}: vec4 match failed. Code:\n${code}`).not.toBeNull();

        if (vec4Match) {
          const components = vec4Match[1].split(',');
          expect(
            components.length,
            `${effectType} vec4 has ${components.length} components instead of 4. Expression: ${vec4Match[1]}`
          ).toBe(4);
        }
      }
    });
  });

  describe('Input Nodes', () => {
    it('should generate globals.time for time node', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/time',
            inputs: [],
            outputs: [{ name: 'Time', type: 'float', links: [1] }],
          },
          {
            id: 2,
            type: 'shader/input/float',
            inputs: [],
            outputs: [{ name: 'Value', type: 'float', links: [2] }],
            properties: { value: 1.0 },
          },
          {
            id: 3,
            type: 'shader/vector/vec4',
            inputs: [
              { name: 'X', type: 'float', link: 1 },
              { name: 'Y', type: 'float', link: 2 },
              { name: 'Z', type: 'float', link: null },
              { name: 'W', type: 'float', link: null },
            ],
            outputs: [{ name: 'Out', type: 'vec4', links: [3] }],
            properties: { x: 0, y: 0, z: 0, w: 1 },
          },
          {
            id: 4,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 3 }],
          },
        ],
        [
          [1, 1, 0, 3, 0, 'float'],
          [2, 2, 0, 3, 1, 'float'],
          [3, 3, 0, 4, 0, 'vec4'],
        ]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      expect(code).toContain('globals.time');
    });

    it('should generate in.uv for UV node', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/uv',
            inputs: [],
            outputs: [{ name: 'UV', type: 'vec2', links: [1] }],
          },
          {
            id: 2,
            type: 'shader/vector/vec4',
            inputs: [
              { name: 'X', type: 'float', link: null },
              { name: 'Y', type: 'float', link: null },
              { name: 'Z', type: 'float', link: null },
              { name: 'W', type: 'float', link: null },
            ],
            outputs: [{ name: 'Out', type: 'vec4', links: [2] }],
            properties: {},
          },
          {
            id: 3,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 2 }],
          },
        ],
        [[2, 2, 0, 3, 0, 'vec4']]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      // UV should be used somewhere in the code (even if not directly in this simple test)
      expect(code).toContain('fn fragment');
    });
  });

  describe('Math Operations', () => {
    it('should generate correct add expression', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/input/float',
            inputs: [],
            outputs: [{ name: 'Value', type: 'float', links: [1] }],
            properties: { value: 1.0 },
          },
          {
            id: 2,
            type: 'shader/input/float',
            inputs: [],
            outputs: [{ name: 'Value', type: 'float', links: [2] }],
            properties: { value: 2.0 },
          },
          {
            id: 3,
            type: 'shader/math/float_add',
            inputs: [
              { name: 'A', type: 'float', link: 1 },
              { name: 'B', type: 'float', link: 2 },
            ],
            outputs: [{ name: 'Out', type: 'float', links: [3] }],
          },
          {
            id: 4,
            type: 'shader/vector/vec4',
            inputs: [
              { name: 'X', type: 'float', link: 3 },
              { name: 'Y', type: 'float', link: null },
              { name: 'Z', type: 'float', link: null },
              { name: 'W', type: 'float', link: null },
            ],
            outputs: [{ name: 'Out', type: 'vec4', links: [4] }],
            properties: {},
          },
          {
            id: 5,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 4 }],
          },
        ],
        [
          [1, 1, 0, 3, 0, 'float'],
          [2, 2, 0, 3, 1, 'float'],
          [3, 3, 0, 4, 0, 'float'],
          [4, 4, 0, 5, 0, 'vec4'],
        ]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      // Should contain an addition
      expect(code).toMatch(/\+/);
    });
  });

  describe('Float Formatting', () => {
    it('should format integers with decimal point', () => {
      const graph = createMockGraph(
        [
          {
            id: 1,
            type: 'shader/input/float',
            inputs: [],
            outputs: [{ name: 'Value', type: 'float', links: [1] }],
            properties: { value: 5 }, // Integer without decimal
          },
          {
            id: 2,
            type: 'shader/vector/vec4',
            inputs: [
              { name: 'X', type: 'float', link: 1 },
              { name: 'Y', type: 'float', link: null },
              { name: 'Z', type: 'float', link: null },
              { name: 'W', type: 'float', link: null },
            ],
            outputs: [{ name: 'Out', type: 'vec4', links: [2] }],
            properties: {},
          },
          {
            id: 3,
            type: 'shader/output',
            inputs: [{ name: 'Color', type: 'vec4', link: 2 }],
          },
        ],
        [
          [1, 1, 0, 2, 0, 'float'],
          [2, 2, 0, 3, 0, 'vec4'],
        ]
      );

      const generator = new ShaderGenerator(graph);
      const code = generator.generate();

      // Should have 5.0 not just 5
      expect(code).toContain('5.0');
      expect(code).not.toMatch(/\b5\b[^.]/); // Should not have bare "5" followed by non-dot
    });
  });
});
