import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * Artist-friendly shape nodes for creating common VFX patterns
 * These nodes output masks (0-1) that can be combined with colors
 */

// Circle - simple filled circle
export class CircleNode extends LGraphNode {
  static title = 'Circle';
  static desc = 'Creates a filled circle shape';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Radius', 'float');
    this.addInput('Softness', 'float');
    this.addOutput('Mask', 'float');

    this.properties = { radius: 0.3, softness: 0.02 };
    this.addWidget('number', 'Radius', 0.3, (v: number) => {
      this.properties.radius = v;
    });
    this.addWidget('number', 'Softness', 0.02, (v: number) => {
      this.properties.softness = v;
    });

    this.size = [180, 90];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/circle', CircleNode);

// Ring - hollow ring shape
export class RingNode extends LGraphNode {
  static title = 'Ring';
  static desc = 'Creates a hollow ring shape';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Radius', 'float');
    this.addInput('Thickness', 'float');
    this.addInput('Softness', 'float');
    this.addOutput('Mask', 'float');

    this.properties = { radius: 0.3, thickness: 0.05, softness: 0.02 };
    this.addWidget('number', 'Radius', 0.3, (v: number) => {
      this.properties.radius = v;
    });
    this.addWidget('number', 'Thickness', 0.05, (v: number) => {
      this.properties.thickness = v;
    });
    this.addWidget('number', 'Softness', 0.02, (v: number) => {
      this.properties.softness = v;
    });

    this.size = [180, 110];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/ring', RingNode);

// Star burst / rays
export class StarBurstNode extends LGraphNode {
  static title = 'Star Burst';
  static desc = 'Creates radial rays emanating from center';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Rays', 'float');
    this.addInput('Sharpness', 'float');
    this.addOutput('Mask', 'float');

    this.properties = { rays: 8, sharpness: 2.0 };
    this.addWidget('number', 'Rays', 8, (v: number) => {
      this.properties.rays = Math.floor(v);
    });
    this.addWidget('number', 'Sharpness', 2.0, (v: number) => {
      this.properties.sharpness = v;
    });

    this.size = [180, 90];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/starburst', StarBurstNode);

// Radial gradient (distance from center)
export class RadialGradientNode extends LGraphNode {
  static title = 'Radial Gradient';
  static desc = 'Distance-based gradient from center';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Scale', 'float');
    this.addOutput('Gradient', 'float');

    this.properties = { scale: 1.0 };
    this.addWidget('number', 'Scale', 1.0, (v: number) => {
      this.properties.scale = v;
    });

    this.size = [180, 70];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/radial_gradient', RadialGradientNode);

// Box / Rectangle
export class BoxNode extends LGraphNode {
  static title = 'Box';
  static desc = 'Creates a rectangular shape';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Size', 'vec2');
    this.addInput('Softness', 'float');
    this.addOutput('Mask', 'float');

    this.properties = { width: 0.4, height: 0.3, softness: 0.02 };
    this.addWidget('number', 'Width', 0.4, (v: number) => {
      this.properties.width = v;
    });
    this.addWidget('number', 'Height', 0.3, (v: number) => {
      this.properties.height = v;
    });
    this.addWidget('number', 'Softness', 0.02, (v: number) => {
      this.properties.softness = v;
    });

    this.size = [180, 110];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/box', BoxNode);

// Directional gradient (for bullet trails, etc)
export class DirectionalGradientNode extends LGraphNode {
  static title = 'Directional Gradient';
  static desc = 'Linear gradient in a direction';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Angle', 'float');
    this.addOutput('Gradient', 'float');

    this.properties = { angle: 0 };
    this.addWidget('number', 'Angle', 0, (v: number) => {
      this.properties.angle = v;
    });

    this.size = [180, 70];
    this.color = '#2a5a3a';
    this.bgcolor = '#1a3a2a';
  }
}
LiteGraph.registerNodeType('shader/shape/directional_gradient', DirectionalGradientNode);
