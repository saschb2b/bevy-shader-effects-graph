import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * Input nodes - provide data to your shader
 */

// Screen Position (UV) - where on screen
export class ScreenPositionNode extends LGraphNode {
  static title = 'Screen Position';
  static desc = 'Current pixel position on screen (0-1)';

  constructor() {
    super();
    this.addOutput('Position', 'vec2');
    this.addOutput('X', 'float');
    this.addOutput('Y', 'float');

    this.size = [160, 70];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/screen_position', ScreenPositionNode);

// Center Offset - position relative to center (great for effects)
export class CenterOffsetNode extends LGraphNode {
  static title = 'Center Offset';
  static desc = 'Position relative to screen center (-0.5 to 0.5)';

  constructor() {
    super();
    this.addOutput('Offset', 'vec2');
    this.addOutput('Distance', 'float');

    this.size = [160, 50];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/center_offset', CenterOffsetNode);

// Time - animation driver
export class TimeInputNode extends LGraphNode {
  static title = 'Time';
  static desc = 'Elapsed time for animations';

  constructor() {
    super();
    this.addOutput('Seconds', 'float');

    this.size = [140, 30];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/time', TimeInputNode);

// Color Picker - choose a color
export class ColorPickerNode extends LGraphNode {
  static title = 'Color';
  static desc = 'Pick a color for your effect';

  constructor() {
    super();
    this.addOutput('RGBA', 'vec4');
    this.addOutput('RGB', 'vec3');
    this.addOutput('Alpha', 'float');

    this.properties = { color: [1, 1, 1, 1] };

    this.size = [160, 80];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/color', ColorPickerNode);

// Float Value - a simple number
export class FloatValueNode extends LGraphNode {
  static title = 'Number';
  static desc = 'A constant number value';

  constructor() {
    super();
    this.addOutput('Value', 'float');

    this.properties = { value: 1.0 };
    this.addWidget('number', 'Value', 1.0, (v: number) => {
      this.properties.value = v;
    });

    this.size = [160, 50];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/float', FloatValueNode);

// Vec2 Value - X,Y pair
export class Vec2ValueNode extends LGraphNode {
  static title = 'Point 2D';
  static desc = 'A 2D coordinate (X, Y)';

  constructor() {
    super();
    this.addOutput('Point', 'vec2');

    this.properties = { x: 0.5, y: 0.5 };
    this.addWidget('number', 'X', 0.5, (v: number) => {
      this.properties.x = v;
    });
    this.addWidget('number', 'Y', 0.5, (v: number) => {
      this.properties.y = v;
    });

    this.size = [160, 70];
    this.color = '#4a6a8a';
    this.bgcolor = '#2a4a6a';
  }
}
LiteGraph.registerNodeType('shader/input/vec2', Vec2ValueNode);
