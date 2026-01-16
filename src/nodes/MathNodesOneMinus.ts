import { LGraphNode, LiteGraph } from 'litegraph.js';

export class OneMinusNode extends LGraphNode {
  static title = 'One Minus (1 - x)';
  constructor() {
    super();
    this.addInput('In', 'float');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/oneminus', OneMinusNode);
