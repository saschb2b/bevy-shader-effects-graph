# Bevy Shader Effects Graph

A powerful **node-based visual shader editor** for [Bevy Engine](https://bevyengine.org/), enabling game developers to create stunning WGSL shaders without writing code.

Built with **React**, **TypeScript**, **Litegraph.js**, and **WebGPU** for real-time preview.

---

## Features

| Feature                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| **Visual Node Editor**   | Drag-and-drop nodes to build complex shaders intuitively |
| **Live WebGPU Preview**  | See your shader render in real-time as you connect nodes |
| **Bevy-Ready WGSL**      | Exports clean, copy-paste ready WGSL code for Bevy 0.18+ |
| **Effect-Focused Nodes** | Math, noise, color, and utility nodes designed for VFX   |
| **Zero Config**          | Works out of the box with sensible defaults              |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in a WebGPU-compatible browser (Chrome 113+, Edge 113+).

---

## How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Node Editor   │ ──► │ Shader Generator │ ──► │  WebGPU Preview │
│  (Litegraph.js) │     │   (TypeScript)   │     │   (Real-time)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │  Bevy WGSL Code  │
                        │   (Copy & Use)   │
                        └──────────────────┘
```

1. **Connect nodes** in the visual editor to define your shader logic
2. **Click Compile** to generate WGSL code
3. **Preview instantly** in the WebGPU viewport
4. **Copy the WGSL** to your Bevy project

---

## Available Nodes

### Input

- **Time** - Animation time from `globals.time`
- **UV** - Fragment UV coordinates

### Math

- **Add / Sub / Mul / Div** - Basic arithmetic (float & vector)
- **Sin** - Sine wave generation
- **Length / Distance** - Vector magnitude operations
- **Step / SmoothStep** - Threshold functions
- **Fract** - Fractional part
- **OneMinus** - Invert value (1.0 - x)
- **Mix** - Linear interpolation

### Vector

- **Vec2 / Vec3 / Vec4** - Construct vectors from components
- **Combine RGB + Alpha** - Merge vec3 color with float alpha

### Color

- **Color Picker** - RGBA color with visual picker

### Noise

- **Simplex Noise** - Procedural noise generation

### Output

- **Fragment Output** - Final color output

---

## Extending the Editor

### Adding a New Node

1. **Create the node** in `src/nodes/`:

```typescript
// src/nodes/MyCustomNode.ts
import { LiteGraph, LGraphNode } from 'litegraph.js';

export function registerMyCustomNode() {
  function MyCustomNode() {
    this.addInput('Value', 'float');
    this.addOutput('Result', 'float');
  }

  MyCustomNode.title = 'My Custom Node';
  LiteGraph.registerNodeType('shader/custom/mynode', MyCustomNode);
}
```

2. **Register it** in `src/nodes/index.ts`

3. **Add generation logic** in `src/utils/ShaderGenerator.ts`:

```typescript
case 'shader/custom/mynode': {
  const input = this.processInput(node, 0);
  expr = `myCustomFunction(${input})`;
  break;
}
```

---

## Project Structure

```
src/
├── components/
│   ├── Editor.tsx        # Litegraph canvas wrapper
│   ├── Preview.tsx       # Tab container (preview + code)
│   ├── ShaderRun.tsx     # WebGPU rendering component
│   └── Layout.tsx        # Split-pane layout
├── nodes/                # Node definitions
│   ├── index.ts          # Node registration
│   ├── MathNodes.ts      # Math operations
│   ├── VectorNodes.ts    # Vector constructors
│   └── ...
├── utils/
│   ├── ShaderGenerator.ts   # Graph → WGSL compiler
│   ├── WebGPURenderer.ts    # WebGPU abstraction
│   └── DefaultGraph.ts      # Demo explosion effect
└── App.tsx               # Main application
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

This project uses **WebGPU** for real-time shader preview. Supported browsers:

- Chrome 113+
- Edge 113+
- Firefox Nightly (with flags)
- Safari 18+ (macOS Sonoma)

---

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Production build         |
| `pnpm lint`    | Run ESLint               |
| `pnpm preview` | Preview production build |

---

## License

MIT

---

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new nodes
- Submit pull requests

---

**Made for the Bevy community**
