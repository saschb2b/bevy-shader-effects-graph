import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { WebGPURenderer } from '../utils/WebGPURenderer';

interface ShaderRunProps {
  code: string;
}

export function ShaderRun({ code }: ShaderRunProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGPURenderer | null>(null);
  const requestRef = useRef<number>(0);

  const [status, setStatus] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // 1. Initialize Renderer on Mount
  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new WebGPURenderer(canvasRef.current);
    rendererRef.current = renderer;

    renderer.onStatusChange = setStatus;
    renderer.onError = setError;

    renderer.initialize().catch(console.error);

    return () => {
      // Cleanup if we add a dispose method later
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Update Shader Code when it changes
  useEffect(() => {
    if (rendererRef.current && code) {
      rendererRef.current.updateShader(code);
    }
  }, [code]);

  // 3. Render Loop (Independent of React state)
  useEffect(() => {
    const loop = (time: number) => {
      if (rendererRef.current) {
        // Pass raw seconds and let logic handle looping
        rendererRef.current.render(time / 1000);

        // Update debug info every ~100ms
        if (Math.floor(time) % 100 < 20) {
          setDebugInfo(`Frames: ${rendererRef.current.frameCount}`);
        }
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', bgcolor: 'black' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        width={800}
        height={600}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bgcolor: 'rgba(0,0,0,0.5)',
          color: 'white',
          p: 0.5,
          fontSize: '10px',
        }}
      >
        Status: {status} | {debugInfo}
      </Box>
      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(255,0,0,0.95)',
            color: 'white',
            p: 4,
            fontSize: '1.2rem',
            fontFamily: 'monospace',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            wordBreak: 'break-all',
            border: '2px solid white',
            zIndex: 9999,
          }}
        >
          ERROR: {error}
        </Box>
      )}
    </Box>
  );
}
