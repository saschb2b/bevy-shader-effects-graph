import { LGraphNode, LiteGraph } from 'litegraph.js';

export class Vec2Node extends LGraphNode {
  static title = 'Vec2';
  constructor() {
    super();
    this.addInput('X', 'float');
    this.addInput('Y', 'float');
    this.addOutput('Out', 'vec2');
    this.properties = { x: 0, y: 0 };
    this.addWidget('number', 'X', 0, (v: number) => {
      this.properties.x = v;
    });
    this.addWidget('number', 'Y', 0, (v: number) => {
      this.properties.y = v;
    });
  }
}
LiteGraph.registerNodeType('shader/vector/vec2', Vec2Node);

export class Vec3Node extends LGraphNode {
  static title = 'Vec3';
  constructor() {
    super();
    this.addInput('X', 'float');
    this.addInput('Y', 'float');
    this.addInput('Z', 'float');
    this.addOutput('Out', 'vec3');
    this.properties = { x: 0, y: 0, z: 0 };
    this.addWidget('number', 'X', 0, (v: number) => {
      this.properties.x = v;
    });
    this.addWidget('number', 'Y', 0, (v: number) => {
      this.properties.y = v;
    });
    this.addWidget('number', 'Z', 0, (v: number) => {
      this.properties.z = v;
    });
  }
}
LiteGraph.registerNodeType('shader/vector/vec3', Vec3Node);

export class Vec4Node extends LGraphNode {
  static title = 'Vec4';
  constructor() {
    super();
    this.addInput('X', 'float');
    this.addInput('Y', 'float');
    this.addInput('Z', 'float');
    this.addInput('W', 'float');
    this.addOutput('Out', 'vec4');
    this.properties = { x: 0, y: 0, z: 0, w: 1 };
    this.addWidget('number', 'X', 0, (v: number) => {
      this.properties.x = v;
    });
    this.addWidget('number', 'Y', 0, (v: number) => {
      this.properties.y = v;
    });
    this.addWidget('number', 'Z', 0, (v: number) => {
      this.properties.z = v;
    });
    this.addWidget('number', 'W', 1, (v: number) => {
      this.properties.w = v;
    });
  }
}
LiteGraph.registerNodeType('shader/vector/vec4', Vec4Node);
