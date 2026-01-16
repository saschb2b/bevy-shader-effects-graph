# Bevy Shader Effects Graph

A **beginner-friendly node-based VFX editor** for [Bevy Engine](https://bevyengine.org/). Create beautiful shader effects for your 2D/3D games without writing code!

Built with **React**, **TypeScript**, **Litegraph.js**, and **WebGPU** for real-time preview.

---

## Create Effects in Seconds

No shader knowledge required! Just connect 2-3 nodes:

```
[ Explosion ] ──► [ Final Output ]
```

That's it! Click **Compile** and see your animated explosion effect instantly.

---

## Built-in Effect Presets

Click **Presets** to load ready-made effects:

| Effect             | Description                  |
| ------------------ | ---------------------------- |
| **Explosion**      | Expanding ring with fade-out |
| **Water Splash**   | Animated ripple waves        |
| **Healing Aura**   | Soft pulsing glow            |
| **Fire**           | Flickering flame effect      |
| **Portal**         | Swirling vortex              |
| **Shield**         | Energy barrier effect        |
| **Electric Spark** | Crackling electricity        |
| **Bullet Trail**   | Projectile energy trail      |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in Chrome/Edge.

---

## Node Categories

### One-Click Effects (Perfect for Beginners)

Just connect one of these to **Final Output**:

- **Explosion** - Animated expanding ring
- **Water Splash** - Ripple effect
- **Healing Aura** - Pulsing glow
- **Fire** - Flickering flames
- **Portal** - Swirling vortex
- **Shield** - Energy barrier
- **Electric Spark** - Lightning
- **Bullet Trail** - Projectile trail

### Shapes (Build Custom Effects)

- **Circle** - Filled circle with soft edges
- **Ring** - Hollow ring
- **Star Burst** - Radial rays
- **Box** - Rectangle
- **Radial Gradient** - Circular falloff
- **Directional Gradient** - Linear fade

### Animation

- **Animate** - Basic 0→1 loop
- **Pulse** - Smooth pulsing
- **Ping Pong** - Bounce back and forth
- **Expand** - Growing animation with fade
- **Wave** - Sine wave motion
- **Flicker** - Random flickering

### Colors

- **Gradient** - Blend two colors
- **Fire Colors** - Red→Orange→Yellow
- **Electric Colors** - Purple→Blue→White
- **Water Colors** - Deep→Light blue
- **Glow** - Boost color intensity
- **Apply Alpha** - Combine color + mask
- **Remap** - Adjust value range
- **Invert** - Flip values
- **Clamp** - Limit range
- **Posterize** - Reduce to steps

### Input

- **Screen Position** - UV coordinates
- **Center Offset** - Distance from center
- **Time** - Animation driver
- **Color** - Pick a color
- **Number** - Constant value
- **Point 2D** - X,Y coordinate

### Output

- **Final Output** - Connect your effect here!

---

## How to Use

### Simple (2 nodes)

1. Right-click → **shader/effect** → Choose an effect
2. Right-click → **shader/output** → **Final Output**
3. Connect the effect's **Result** to output's **Color**
4. Click **Compile**

### Custom (Build your own)

1. Add a **Shape** node (e.g., Ring)
2. Add an **Animation** node (e.g., Expand)
3. Connect animation to shape's radius
4. Add **Color** nodes
5. Use **Apply Alpha** to combine
6. Connect to **Final Output**

---

## Copy to Bevy

1. Click the **WGSL Code** tab
2. Copy the generated shader
3. Paste into your Bevy material

```rust
// In Bevy
#[derive(Asset, TypePath, AsBindGroup, Clone)]
pub struct MyEffectMaterial {}

impl Material for MyEffectMaterial {
    fn fragment_shader() -> ShaderRef {
        "shaders/my_effect.wgsl".into()
    }
}
```

---

## Tech Stack

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| **React 18**       | UI framework            |
| **TypeScript**     | Type safety             |
| **Vite**           | Build tooling           |
| **Material UI v7** | Component library       |
| **Litegraph.js**   | Node editor engine      |
| **WebGPU**         | GPU-accelerated preview |

---

## Browser Requirements

Requires **WebGPU** support:

- Chrome 113+
- Edge 113+
- Safari 18+ (macOS Sonoma)

---

## Project Structure

```
src/
├── nodes/
│   ├── EffectNodes.ts     # High-level effects
│   ├── ShapeNodes.ts      # Shape primitives
│   ├── AnimationNodes.ts  # Animation helpers
│   ├── ColorNodes.ts      # Color utilities
│   ├── InputNodes.ts      # Input values
│   └── OutputNodes.ts     # Final output
├── utils/
│   ├── ShaderGenerator.ts # Graph → WGSL
│   ├── WebGPURenderer.ts  # Preview renderer
│   └── DefaultGraph.ts    # Preset graphs
└── components/
    ├── Editor.tsx         # Node editor
    ├── Preview.tsx        # Preview panel
    └── ShaderRun.tsx      # WebGPU canvas
```

---

## License

MIT

---

**Made for game developers who want great effects without the shader headache!**
