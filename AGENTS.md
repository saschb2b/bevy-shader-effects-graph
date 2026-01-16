# Agent Guidelines

## Project Context

This is a **Bevy Shader Effects Graph** editor.

- **Stack**: React, Vite, TypeScript, Material UI v7, Litegraph.js.
- **Goal**: A node-based editor to generate WGSL shaders for Bevy Engine 2D/3D games.
- **Current State**: Basic editor works, WGSL generation works, Preview is implemented via WebGPU.

## How to use Agent-Browser

Since you are a CLI agent without a visual head, "using agent-browser" means simulating the verification process:

1.  **Assume the user cannot verify logic errors**: If the screen is black, assume a shader compilation error or logic error (all alpha=0, or positions outside clip space).
2.  **Verify Code Logic**: Trace the generated WGSL manually.
3.  **Check Browser Console Simulation**: In `ShaderRun.tsx`, we catch WebGPU errors. Ensure these errors are visible to the user.

### Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes

## Common Issues & Solutions

- **Black Screen**:
  - Invalid WGSL types (e.g., `vec3 * vec4`).
  - `SmoothStep` edges reversed or equal? (Bevy/WebGPU usually handles it, but logic might result in 0).
  - Alpha is 0.
  - Geometry is culled (Backface culling? We use a quad, check winding order).
- **WGSL Errors**:
  - `ShaderGenerator` must handle type mismatches.
  - Unlinked inputs default to `0.0` (float), which breaks `vec3` operations.

## Architecture

- **Nodes**: defined in `src/nodes/`.
- **Generator**: `src/utils/ShaderGenerator.ts` converts graph to string.
- **Preview**: `src/components/ShaderRun.tsx` runs the WGSL using raw WebGPU API.
