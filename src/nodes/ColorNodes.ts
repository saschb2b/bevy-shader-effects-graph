import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * Artist-friendly color nodes for creating beautiful effects
 */

// Gradient - blend between two colors
export class GradientNode extends LGraphNode {
  static title = 'Gradient';
  static desc = 'Blends between two colors based on input';

  constructor() {
    super();
    this.addInput('Factor', 'float');
    this.addInput('Color A', 'vec3');
    this.addInput('Color B', 'vec3');
    this.addOutput('Color', 'vec3');

    this.properties = {
      colorA: [1, 0.2, 0],
      colorB: [1, 1, 0],
    };

    this.size = [180, 70];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/gradient', GradientNode);

// Glow - adds glow/emission effect
export class GlowNode extends LGraphNode {
  static title = 'Glow';
  static desc = 'Adds a glowing effect to a color';

  constructor() {
    super();
    this.addInput('Color', 'vec3');
    this.addInput('Intensity', 'float');
    this.addOutput('Color', 'vec3');

    this.properties = { intensity: 2.0 };
    this.addWidget('number', 'Intensity', 2.0, (v: number) => {
      this.properties.intensity = v;
    });

    this.size = [180, 70];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/glow', GlowNode);

// Fire Colors - preset fire gradient
export class FireColorsNode extends LGraphNode {
  static title = 'Fire Colors';
  static desc = 'Fire gradient from dark to bright';

  constructor() {
    super();
    this.addInput('Factor', 'float');
    this.addOutput('Color', 'vec3');

    this.size = [180, 50];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/fire', FireColorsNode);

// Electric Colors - preset electric/plasma gradient
export class ElectricColorsNode extends LGraphNode {
  static title = 'Electric Colors';
  static desc = 'Electric/plasma gradient';

  constructor() {
    super();
    this.addInput('Factor', 'float');
    this.addOutput('Color', 'vec3');

    this.size = [180, 50];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/electric', ElectricColorsNode);

// Water Colors - preset water gradient
export class WaterColorsNode extends LGraphNode {
  static title = 'Water Colors';
  static desc = 'Water/ice gradient';

  constructor() {
    super();
    this.addInput('Factor', 'float');
    this.addOutput('Color', 'vec3');

    this.size = [180, 50];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/water', WaterColorsNode);

// Apply Alpha - combines color with mask
export class ApplyAlphaNode extends LGraphNode {
  static title = 'Apply Alpha';
  static desc = 'Combines RGB color with alpha mask';

  constructor() {
    super();
    this.addInput('Color', 'vec3');
    this.addInput('Alpha', 'float');
    this.addOutput('RGBA', 'vec4');

    this.size = [180, 50];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/apply_alpha', ApplyAlphaNode);

// Remap - remaps a 0-1 value to a different range
export class RemapNode extends LGraphNode {
  static title = 'Remap';
  static desc = 'Remaps value from one range to another';

  constructor() {
    super();
    this.addInput('Value', 'float');
    this.addInput('From Min', 'float');
    this.addInput('From Max', 'float');
    this.addInput('To Min', 'float');
    this.addInput('To Max', 'float');
    this.addOutput('Out', 'float');

    this.properties = { fromMin: 0, fromMax: 1, toMin: 0, toMax: 1 };
    this.addWidget('number', 'From Min', 0, (v: number) => {
      this.properties.fromMin = v;
    });
    this.addWidget('number', 'From Max', 1, (v: number) => {
      this.properties.fromMax = v;
    });
    this.addWidget('number', 'To Min', 0, (v: number) => {
      this.properties.toMin = v;
    });
    this.addWidget('number', 'To Max', 1, (v: number) => {
      this.properties.toMax = v;
    });

    this.size = [180, 130];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/remap', RemapNode);

// Invert - inverts a value (1 - x)
export class InvertNode extends LGraphNode {
  static title = 'Invert';
  static desc = 'Inverts a value (1 - input)';

  constructor() {
    super();
    this.addInput('Value', 'float');
    this.addOutput('Out', 'float');

    this.size = [140, 50];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/invert', InvertNode);

// Clamp - clamps value between min and max
export class ClampNode extends LGraphNode {
  static title = 'Clamp';
  static desc = 'Limits value between min and max';

  constructor() {
    super();
    this.addInput('Value', 'float');
    this.addInput('Min', 'float');
    this.addInput('Max', 'float');
    this.addOutput('Out', 'float');

    this.properties = { min: 0, max: 1 };
    this.addWidget('number', 'Min', 0, (v: number) => {
      this.properties.min = v;
    });
    this.addWidget('number', 'Max', 1, (v: number) => {
      this.properties.max = v;
    });

    this.size = [180, 90];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/clamp', ClampNode);

// Posterize - reduces color levels for stylized look
export class PosterizeNode extends LGraphNode {
  static title = 'Posterize';
  static desc = 'Reduces value to discrete steps';

  constructor() {
    super();
    this.addInput('Value', 'float');
    this.addInput('Steps', 'float');
    this.addOutput('Out', 'float');

    this.properties = { steps: 4 };
    this.addWidget('number', 'Steps', 4, (v: number) => {
      this.properties.steps = Math.max(1, Math.floor(v));
    });

    this.size = [180, 70];
    this.color = '#6a4a2a';
    this.bgcolor = '#4a3a2a';
  }
}
LiteGraph.registerNodeType('shader/color/posterize', PosterizeNode);
