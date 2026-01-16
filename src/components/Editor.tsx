import { useEffect, useRef, useState } from 'react';
import { LGraph, LGraphCanvas } from 'litegraph.js';
import 'litegraph.js/css/litegraph.css';
import { Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import '../nodes';
import { ShaderGenerator } from '../utils/ShaderGenerator';
import {
  defaultGraph,
  waterSplashGraph,
  healingAuraGraph,
  fireGraph,
  portalGraph,
} from '../utils/DefaultGraph';

interface EditorProps {
  onCodeChange?: (code: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presets: { name: string; graph: any }[] = [
  { name: 'Explosion', graph: defaultGraph },
  { name: 'Water Splash', graph: waterSplashGraph },
  { name: 'Healing Aura', graph: healingAuraGraph },
  { name: 'Fire', graph: fireGraph },
  { name: 'Portal', graph: portalGraph },
];

export function Editor({ onCodeChange }: EditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<LGraph | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const compileGraph = () => {
    if (graphRef.current && onCodeChange) {
      const generator = new ShaderGenerator(graphRef.current);
      onCodeChange(generator.generate());
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadGraph = (graphData: any) => {
    if (!graphRef.current) return;
    const graph = graphRef.current;
    graph.clear();
    graph.configure(graphData);
    compileGraph();
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const graph = new LGraph();
    graphRef.current = graph;

    // Initialize with explosion example
    graph.configure(defaultGraph);
    compileGraph();

    const canvas = new LGraphCanvas(canvasRef.current, graph);

    const handleResize = () => {
      if (canvasRef.current?.parentElement) {
        canvas.resize(
          canvasRef.current.parentElement.clientWidth,
          canvasRef.current.parentElement.clientHeight
        );
      }
    };
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvasRef.current.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    graph.start();

    return () => {
      graph.stop();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: '#222', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

      <ButtonGroup sx={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
        <Button variant="contained" color="secondary" onClick={(e) => setAnchorEl(e.currentTarget)}>
          Presets
        </Button>
        <Button variant="contained" color="primary" onClick={compileGraph}>
          Compile
        </Button>
      </ButtonGroup>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {presets.map((preset) => (
          <MenuItem key={preset.name} onClick={() => loadGraph(preset.graph)}>
            {preset.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Help text */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          zIndex: 100,
        }}
      >
        Right-click to add nodes | Drag to connect | Double-click to edit
      </Box>
    </Box>
  );
}
