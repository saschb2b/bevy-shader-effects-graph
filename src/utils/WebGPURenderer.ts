export class WebGPURenderer {
  private canvas: HTMLCanvasElement;
  private device: GPUDevice | null = null;
  private context: GPUCanvasContext | null = null;
  private pipeline: GPURenderPipeline | null = null;
  private uniformBuffer: GPUBuffer | null = null;
  private bindGroup: GPUBindGroup | null = null;
  private presentationFormat: GPUTextureFormat;
  private pendingShaderCode: string | null = null;

  public onStatusChange: (status: string) => void = () => {};
  public onError: (error: string | null) => void = () => {};
  public frameCount = 0;
  public initialized = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.presentationFormat = navigator.gpu?.getPreferredCanvasFormat() || 'bgra8unorm';
  }

  async initialize() {
    this.onStatusChange('Checking GPU...');
    if (!navigator.gpu) {
      throw new Error('WebGPU not supported');
    }

    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) throw new Error('No GPU adapter found');

      this.device = await adapter.requestDevice();

      this.context = this.canvas.getContext('webgpu');
      if (!this.context) throw new Error('Could not get WebGPU context');

      this.context.configure({
        device: this.device,
        format: this.presentationFormat,
        alphaMode: 'premultiplied',
      });

      // Create uniform buffer for time (16 bytes aligned)
      this.uniformBuffer = this.device.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      this.initialized = true;
      this.onStatusChange('Ready');

      // Process any pending shader code that was queued before init completed
      if (this.pendingShaderCode) {
        const code = this.pendingShaderCode;
        this.pendingShaderCode = null;
        await this.updateShader(code);
      }
    } catch (e: any) {
      this.onError(e.message);
      this.onStatusChange('Failed');
      throw e;
    }
  }

  async updateShader(wgslCode: string) {
    // If not initialized yet, queue the shader for later
    if (!this.initialized || !this.device || !this.uniformBuffer) {
      console.log('WebGPU not ready, queuing shader code for later');
      this.pendingShaderCode = wgslCode;
      return;
    }

    console.log('updateShader called with code length:', wgslCode.length);

    // Reset ready state before starting update
    this.pipeline = null;
    this.bindGroup = null;

    try {
      const runnableCode = this.preprocessShader(wgslCode);

      const shaderModule = this.device.createShaderModule({
        code: runnableCode,
      });

      const info = await shaderModule.getCompilationInfo();
      const error = info.messages.find((m) => m.type === 'error');
      if (error) {
        const msg = `Shader Error: ${error.message} (Line ${error.lineNum})`;
        console.error(msg);
        this.onError(msg);
        return;
      }

      // Create Pipeline Layout
      const bindGroupLayout = this.device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: { type: 'uniform' },
          },
        ],
      });

      const pipelineLayout = this.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      });

      // Create Pipeline
      this.pipeline = this.device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: {
          module: this.device.createShaderModule({
            code: this.getVertexShader(),
          }),
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fragment_main',
          targets: [
            {
              format: this.presentationFormat,
            },
          ],
        },
        primitive: { topology: 'triangle-strip' },
      });

      // Create Bind Group
      this.bindGroup = this.device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          {
            binding: 0,
            resource: { buffer: this.uniformBuffer },
          },
        ],
      });

      this.onError(null);
      console.log('Shader updated successfully. Pipeline and BindGroup created.');
    } catch (e: any) {
      console.error('Shader update exception:', e);
      this.onError(e.message);
    }
  }

  render(timeInSeconds: number) {
    if (!this.device || !this.context || !this.pipeline || !this.bindGroup || !this.uniformBuffer) {
      // Silent return to avoid console spam.
      // Errors are already handled in updateShader.
      return;
    }

    this.frameCount++;
    if (this.frameCount % 60 === 0) console.log('Rendering frame', this.frameCount);

    // Write Time Uniform
    this.device.queue.writeBuffer(this.uniformBuffer, 0, new Float32Array([timeInSeconds]));

    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();

    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.1, g: 0.1, b: 0.2, a: 1.0 }, // Dark Blue
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });

    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.bindGroup);
    passEncoder.draw(4);
    passEncoder.end();

    this.device.queue.submit([commandEncoder.finish()]);
  }

  private preprocessShader(bevyCode: string): string {
    let code = bevyCode.replace(/#import.*/g, '');
    code = code.replace(/@fragment/g, '');
    code = code.replace(/->\s*@location\(\d+\)\s*vec4<f32>/g, '-> vec4<f32>');

    return `
            struct VertexOutput {
                @builtin(position) position: vec4<f32>,
                @location(0) uv: vec2<f32>,
            };

            struct Globals {
                time: f32,
            };

            @group(0) @binding(0) var<uniform> globals: Globals;

            ${code}

            @fragment
            fn fragment_main(in: VertexOutput) -> @location(0) vec4<f32> {
                return fragment(in);
            }
        `;
  }

  private getVertexShader(): string {
    return `
            struct VertexOutput {
                @builtin(position) position: vec4<f32>,
                @location(0) uv: vec2<f32>,
            };

            @vertex
            fn vs_main(@builtin(vertex_index) VertexIndex : u32) -> VertexOutput {
                var pos = array<vec2<f32>, 4>(
                    vec2<f32>(-1.0, -1.0),
                    vec2<f32>( 1.0, -1.0),
                    vec2<f32>(-1.0,  1.0),
                    vec2<f32>( 1.0,  1.0)
                );
                var uv = array<vec2<f32>, 4>(
                    vec2<f32>(0.0, 1.0),
                    vec2<f32>(1.0, 1.0),
                    vec2<f32>(0.0, 0.0),
                    vec2<f32>(1.0, 0.0)
                );

                var output: VertexOutput;
                output.position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
                output.uv = uv[VertexIndex];
                return output;
            }
        `;
  }
}
