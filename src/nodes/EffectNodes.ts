import { LGraphNode, LiteGraph } from 'litegraph.js';

/**
 * High-level effect nodes - one node, one complete effect!
 * Perfect for non-technical users who want instant results
 */

// Explosion Effect - complete animated explosion
export class ExplosionEffectNode extends LGraphNode {
  static title = 'Explosion';
  static desc = 'Complete animated explosion effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addInput('Speed', 'float');
    this.addInput('Size', 'float');
    this.addOutput('Result', 'vec4');

    this.properties = { speed: 0.5, size: 0.4, thickness: 0.08 };
    this.addWidget('number', 'Speed', 0.5, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Size', 0.4, (v: number) => {
      this.properties.size = v;
    });
    this.addWidget('number', 'Thickness', 0.08, (v: number) => {
      this.properties.thickness = v;
    });

    this.size = [200, 130];
    this.color = '#8a3030';
    this.bgcolor = '#5a2020';
  }
}
LiteGraph.registerNodeType('shader/effect/explosion', ExplosionEffectNode);

// Bullet Trail - elongated energy trail
export class BulletTrailNode extends LGraphNode {
  static title = 'Bullet Trail';
  static desc = 'Energy trail effect for projectiles';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addInput('Length', 'float');
    this.addOutput('Result', 'vec4');

    this.properties = { length: 0.3, width: 0.05, glow: 2.0 };
    this.addWidget('number', 'Length', 0.3, (v: number) => {
      this.properties.length = v;
    });
    this.addWidget('number', 'Width', 0.05, (v: number) => {
      this.properties.width = v;
    });
    this.addWidget('number', 'Glow', 2.0, (v: number) => {
      this.properties.glow = v;
    });

    this.size = [200, 110];
    this.color = '#308a30';
    this.bgcolor = '#205a20';
  }
}
LiteGraph.registerNodeType('shader/effect/bullet_trail', BulletTrailNode);

// Water Splash - ripple splash effect
export class WaterSplashNode extends LGraphNode {
  static title = 'Water Splash';
  static desc = 'Animated water ripple effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addInput('Speed', 'float');
    this.addOutput('Result', 'vec4');

    this.properties = { speed: 1.0, rings: 3, decay: 0.5 };
    this.addWidget('number', 'Speed', 1.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Rings', 3, (v: number) => {
      this.properties.rings = Math.floor(v);
    });
    this.addWidget('number', 'Decay', 0.5, (v: number) => {
      this.properties.decay = v;
    });

    this.size = [200, 110];
    this.color = '#3030a0';
    this.bgcolor = '#202060';
  }
}
LiteGraph.registerNodeType('shader/effect/water_splash', WaterSplashNode);

// Healing Aura - gentle pulsing glow
export class HealingAuraNode extends LGraphNode {
  static title = 'Healing Aura';
  static desc = 'Soft pulsing healing effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addOutput('Result', 'vec4');

    this.properties = { pulseSpeed: 2.0, innerGlow: 0.3, outerGlow: 0.5 };
    this.addWidget('number', 'Pulse Speed', 2.0, (v: number) => {
      this.properties.pulseSpeed = v;
    });
    this.addWidget('number', 'Inner Glow', 0.3, (v: number) => {
      this.properties.innerGlow = v;
    });
    this.addWidget('number', 'Outer Glow', 0.5, (v: number) => {
      this.properties.outerGlow = v;
    });

    this.size = [200, 110];
    this.color = '#30a080';
    this.bgcolor = '#206050';
  }
}
LiteGraph.registerNodeType('shader/effect/healing_aura', HealingAuraNode);

// Shield Effect - energy shield bubble
export class ShieldEffectNode extends LGraphNode {
  static title = 'Shield';
  static desc = 'Energy shield/barrier effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addOutput('Result', 'vec4');

    this.properties = { radius: 0.4, edgeWidth: 0.05, hexPattern: true };
    this.addWidget('number', 'Radius', 0.4, (v: number) => {
      this.properties.radius = v;
    });
    this.addWidget('number', 'Edge Width', 0.05, (v: number) => {
      this.properties.edgeWidth = v;
    });

    this.size = [200, 90];
    this.color = '#3080a0';
    this.bgcolor = '#205060';
  }
}
LiteGraph.registerNodeType('shader/effect/shield', ShieldEffectNode);

// Fire Effect - flickering fire
export class FireEffectNode extends LGraphNode {
  static title = 'Fire';
  static desc = 'Animated fire/flame effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addOutput('Result', 'vec4');

    this.properties = { intensity: 1.0, speed: 3.0, height: 0.4 };
    this.addWidget('number', 'Intensity', 1.0, (v: number) => {
      this.properties.intensity = v;
    });
    this.addWidget('number', 'Speed', 3.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Height', 0.4, (v: number) => {
      this.properties.height = v;
    });

    this.size = [200, 110];
    this.color = '#a05030';
    this.bgcolor = '#603020';
  }
}
LiteGraph.registerNodeType('shader/effect/fire', FireEffectNode);

// Electric Spark - crackling electricity
export class ElectricSparkNode extends LGraphNode {
  static title = 'Electric Spark';
  static desc = 'Crackling electricity effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color', 'vec3');
    this.addOutput('Result', 'vec4');

    this.properties = { intensity: 1.0, speed: 15.0, branches: 5 };
    this.addWidget('number', 'Intensity', 1.0, (v: number) => {
      this.properties.intensity = v;
    });
    this.addWidget('number', 'Speed', 15.0, (v: number) => {
      this.properties.speed = v;
    });

    this.size = [200, 90];
    this.color = '#6060a0';
    this.bgcolor = '#404060';
  }
}
LiteGraph.registerNodeType('shader/effect/electric_spark', ElectricSparkNode);

// Portal Effect - swirling portal
export class PortalEffectNode extends LGraphNode {
  static title = 'Portal';
  static desc = 'Swirling portal/vortex effect';

  constructor() {
    super();
    this.addInput('Position', 'vec2');
    this.addInput('Color A', 'vec3');
    this.addInput('Color B', 'vec3');
    this.addOutput('Result', 'vec4');

    this.properties = { speed: 1.0, twist: 3.0, radius: 0.3 };
    this.addWidget('number', 'Speed', 1.0, (v: number) => {
      this.properties.speed = v;
    });
    this.addWidget('number', 'Twist', 3.0, (v: number) => {
      this.properties.twist = v;
    });
    this.addWidget('number', 'Radius', 0.3, (v: number) => {
      this.properties.radius = v;
    });

    this.size = [200, 110];
    this.color = '#8030a0';
    this.bgcolor = '#502060';
  }
}
LiteGraph.registerNodeType('shader/effect/portal', PortalEffectNode);
