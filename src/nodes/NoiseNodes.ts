import { LGraphNode, LiteGraph } from 'litegraph.js';

export class NoiseNode extends LGraphNode {
  static title = 'Simplex Noise';
  constructor() {
    super();
    this.addInput('UV', 'vec2');
    this.addInput('Scale', 'float');
    this.addOutput('Value', 'float');
    this.properties = { scale: 10.0 };
  }
}
LiteGraph.registerNodeType('shader/noise/simplex', NoiseNode);
