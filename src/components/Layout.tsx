import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface LayoutProps {
  preview: ReactNode;
  editor: ReactNode;
}

export function Layout({ preview, editor }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <Box sx={{ height: '40%', borderBottom: 1, borderColor: 'divider', overflow: 'hidden' }}>
        {preview}
      </Box>
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>{editor}</Box>
    </Box>
  );
}
