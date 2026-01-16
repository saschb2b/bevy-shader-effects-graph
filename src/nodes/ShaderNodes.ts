import { LGraphNode, LiteGraph } from 'litegraph.js';

export class TimeNode extends LGraphNode {
  static title = 'Time';
  constructor() {
    super();
    this.addOutput('Time', 'float');
  }
}
LiteGraph.registerNodeType('shader/time', TimeNode);

export class ColorNode extends LGraphNode {
  static title = 'Color';
  constructor() {
    super();
    this.addOutput('Color', 'vec4');
    this.addOutput('RGB', 'vec3');
    this.addOutput('Alpha', 'float');
    this.properties = { color: [1, 1, 1, 1] };
  }
}
LiteGraph.registerNodeType('shader/color', ColorNode);

export class UVNode extends LGraphNode {
  static title = 'UV';
  constructor() {
    super();
    this.addOutput('UV', 'vec2');
  }
}
LiteGraph.registerNodeType('shader/uv', UVNode);

export class SinNode extends LGraphNode {
  static title = 'Sin';
  constructor() {
    super();
    this.addInput('In', 'float');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/sin', SinNode);

export class OutputNode extends LGraphNode {
  static title = 'Fragment Output';
  constructor() {
    super();
    this.addInput('Color', 'vec4');
  }
}
LiteGraph.registerNodeType('shader/output', OutputNode);
