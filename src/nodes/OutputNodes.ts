import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * Output nodes - final result of your shader
 */

// Final Output - what gets displayed
export class FinalOutputNode extends LGraphNode {
  static title = 'Final Output';
  static desc = 'The final color output of your effect';

  constructor() {
    super();
    this.addInput('Color', 'vec4');

    this.size = [160, 30];
    this.color = '#8a4a4a';
    this.bgcolor = '#6a2a2a';
  }
}
LiteGraph.registerNodeType('shader/output/final', FinalOutputNode);
