declare module 'litegraph.js' {
  export interface LLink {
    id: number;
    origin_id: number;
    origin_slot: number;
    target_id: number;
    target_slot: number;
    type: string;
  }

  export class LGraphNode {
    static title: string;
    constructor();
    addInput(name: string, type: string | number, extra_info?: any): void;
    addOutput(name: string, type: string | number, extra_info?: any): void;
    properties: Record<string, any>;
    widgets_values?: any[];
    onExecute(): void;
    addWidget(type: string, name: string, value: any, callback?: Function, options?: any): void;
    getInputData(slot: number): any;
    setOutputData(slot: number, data: any): void;
    title: string;
    id: number;
    type: string;
    pos: number[];
    inputs: { name: string; type: string; link: number | null }[];
    outputs: { name: string; type: string; links: number[] | null }[];
    connect(slot: number, node: LGraphNode, target_slot: number): void;
  }

  export class LGraph {
    start(): void;
    stop(): void;
    configure(data: any): void;
    serialize(): any;
    clear(): void;
    add(node: LGraphNode): void;
    findNodesByClass(cls: any): LGraphNode[];
    getNodeById(id: number): LGraphNode;
    links: Record<number, LLink>;
    _nodes: LGraphNode[];
  }

  export class LGraphCanvas {
    constructor(element: HTMLCanvasElement, graph: LGraph);
    resize(width: number, height: number): void;
    draw(force: boolean, interact: boolean): void;
  }

  export const LiteGraph: {
    registerNodeType(type: string, node_class: any): void;
    createNode(type: string): LGraphNode;
    LGraphNode: typeof LGraphNode;
  };
}
