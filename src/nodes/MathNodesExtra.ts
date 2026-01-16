import { LGraphNode, LiteGraph } from 'litegraph.js';

export class LengthNode extends LGraphNode {
  static title = 'Length';
  constructor() {
    super();
    this.addInput('In', 'vec3'); // Input type relaxed in usage
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/length', LengthNode);

export class DistanceNode extends LGraphNode {
  static title = 'Distance';
  constructor() {
    super();
    this.addInput('A', 'vec3');
    this.addInput('B', 'vec3');
    this.addOutput('Out', 'float');
  }
}
LiteGraph.registerNodeType('shader/math/distance', DistanceNode);
