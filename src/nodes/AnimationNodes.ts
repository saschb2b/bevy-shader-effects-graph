import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * Artist-friendly animation nodes for creating dynamic effects
 * These handle the complexity of time-based animations
 */

// Animate - makes any value animate over time (main workhorse)
export class AnimateNode extends LGraphNode {
  static title = 'Animate';
  static desc = 'Animates a value from 0 to 1 over time';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addOutput('Value', 'float');
    this.addOutput('Loop', 'float');

    this.properties = { speed: 1.0 };
    this.addWidget('number', 'Speed', 1.0, (v: number) => {
      this.properties.speed = v;
    });

    this.size = [180, 70];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/animate', AnimateNode);

// Pulse - creates a pulsing effect (great for glows, heartbeats)
export class PulseNode extends LGraphNode {
  static title = 'Pulse';
  static desc = 'Creates a smooth pulsing animation';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addInput('Min', 'float');
    this.addInput('Max', 'float');
    this.addOutput('Value', 'float');

    this.properties = { speed: 2.0, min: 0.5, max: 1.0 };
    this.addWidget('number', 'Speed', 2.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Min', 0.5, (v: number) => {
      this.properties.min = v;
    });
    this.addWidget('number', 'Max', 1.0, (v: number) => {
      this.properties.max = v;
    });

    this.size = [180, 110];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/pulse', PulseNode);

// Ping Pong - bounces back and forth (0->1->0->1...)
export class PingPongNode extends LGraphNode {
  static title = 'Ping Pong';
  static desc = 'Bounces value back and forth';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addOutput('Value', 'float');

    this.properties = { speed: 1.0 };
    this.addWidget('number', 'Speed', 1.0, (v: number) => {
      this.properties.speed = v;
    });

    this.size = [180, 70];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/pingpong', PingPongNode);

// Expand - for explosion/ring expansion
export class ExpandNode extends LGraphNode {
  static title = 'Expand';
  static desc = 'Creates an expanding animation (0 to 1 loop)';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addOutput('Size', 'float');
    this.addOutput('Fade', 'float');

    this.properties = { speed: 0.5, fadeStart: 0.5 };
    this.addWidget('number', 'Speed', 0.5, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Fade Start', 0.5, (v: number) => {
      this.properties.fadeStart = v;
    });

    this.size = [180, 90];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/expand', ExpandNode);

// Wave - sine wave animation
export class WaveNode extends LGraphNode {
  static title = 'Wave';
  static desc = 'Creates smooth wave motion';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addInput('Amplitude', 'float');
    this.addOutput('Value', 'float');

    this.properties = { speed: 2.0, amplitude: 1.0 };
    this.addWidget('number', 'Speed', 2.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Amplitude', 1.0, (v: number) => {
      this.properties.amplitude = v;
    });

    this.size = [180, 90];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/wave', WaveNode);

// Flicker - random flickering for fire, electricity
export class FlickerNode extends LGraphNode {
  static title = 'Flicker';
  static desc = 'Creates random flickering effect';

  constructor() {
    super();
    this.addInput('Speed', 'float');
    this.addInput('Intensity', 'float');
    this.addOutput('Value', 'float');

    this.properties = { speed: 10.0, intensity: 0.3 };
    this.addWidget('number', 'Speed', 10.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Intensity', 0.3, (v: number) => {
      this.properties.intensity = v;
    });

    this.size = [180, 90];
    this.color = '#5a3a6a';
    this.bgcolor = '#3a2a4a';
  }
}
LiteGraph.registerNodeType('shader/animate/flicker', FlickerNode);
