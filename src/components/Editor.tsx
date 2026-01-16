import { useEffect, useRef } from 'react';
import { LGraph, LGraphCanvas } from 'litegraph.js';
import 'litegraph.js/css/litegraph.css';
import { Box, Button, ButtonGroup } from '@mui/material';
import '../nodes';
import { ShaderGenerator } from '../utils/ShaderGenerator';
import { defaultGraph } from '../utils/DefaultGraph';

interface EditorProps {
  onCodeChange?: (code: string) => void;
}

export function Editor({ onCodeChange }: EditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<LGraph | null>(null);

  const compileGraph = () => {
    if (graphRef.current && onCodeChange) {
      const generator = new ShaderGenerator(graphRef.current);
      onCodeChange(generator.generate());
    }
  };

  const loadExample = () => {
    if (!graphRef.current) return;
    const graph = graphRef.current;
    graph.clear();

    // Load default graph from JSON
    if (defaultGraph) {
      graph.configure(defaultGraph);
    }

    compileGraph();
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const graph = new LGraph();
    graphRef.current = graph;

    // Initialize with example
    loadExample();

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
        <Button variant="contained" color="secondary" onClick={loadExample}>
          Reset Demo
        </Button>
        <Button variant="contained" color="primary" onClick={compileGraph}>
          Compile
        </Button>
      </ButtonGroup>
    </Box>
  );
}
