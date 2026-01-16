import { LGraphNode, LiteGraph } from 'litegraph.js';

const operations = [
  { name: 'add', title: 'Add', op: '+' },
  { name: 'sub', title: 'Subtract', op: '-' },
  { name: 'mul', title: 'Multiply', op: '*' },
  { name: 'div', title: 'Divide', op: '/' },
];

operations.forEach((op) => {
  class OpNode extends LGraphNode {
    static title = op.title;
    constructor() {
      super();
      this.addInput('A', 'vec3');
      this.addInput('B', 'vec3');
      this.addOutput('Out', 'vec3');
    }
  }
  LiteGraph.registerNodeType(`shader/math/${op.name}`, OpNode);
});

export class MixNode extends LGraphNode {
  static title = 'Mix';
  constructor() {
    super();
    this.addInput('A', 'vec3');
    this.addInput('B', 'vec3');
    this.addInput('T', 'float');
    this.addOutput('Out', 'vec3');
  }
}
LiteGraph.registerNodeType('shader/math/mix', MixNode);

export class StepNode extends LGraphNode {
  static title = 'Step';
  constructor() {
    super();
    this.addInput('Edge', 'float');
    this.addInput('In', 'float');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/step', StepNode);

export class SmoothStepNode extends LGraphNode {
  static title = 'SmoothStep';
  constructor() {
    super();
    this.addInput('Edge1', 'float');
    this.addInput('Edge2', 'float');
    this.addInput('In', 'float');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/smoothstep', SmoothStepNode);

export class FractNode extends LGraphNode {
  static title = 'Fract';
  constructor() {
    super();
    this.addInput('In', 'float');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/fract', FractNode);
