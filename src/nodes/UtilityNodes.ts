import { LGraphNode, LiteGraph } from 'litegraph.js';

export class CombineVec3FloatNode extends LGraphNode {
  static title = 'Vec3 + Float -> Vec4';
  constructor() {
    super();
    this.addInput('RGB', 'vec3');
    this.addInput('A', 'float');
    this.addOutput('Out', 'vec4');
  }
}
LiteGraph.registerNodeType('shader/vector/combine_vec3_float', CombineVec3FloatNode);
