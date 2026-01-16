import { LGraphNode, LiteGraph } from 'litegraph.js';

const floatOperations = [
  { name: 'add', title: 'Add (Float)', op: '+' },
  { name: 'sub', title: 'Subtract (Float)', op: '-' },
  { name: 'mul', title: 'Multiply (Float)', op: '*' },
  { name: 'div', title: 'Divide (Float)', op: '/' },
];

floatOperations.forEach((op) => {
  class FloatOpNode extends LGraphNode {
    static title = op.title;
    constructor() {
      super();
      this.addInput('A', 'float');
      this.addInput('B', 'float');
      this.addOutput('Out', 'float');
    }
  }
  LiteGraph.registerNodeType(`shader/math/float_${op.name}`, FloatOpNode);
});
