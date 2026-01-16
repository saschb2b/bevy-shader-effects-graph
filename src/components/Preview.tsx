import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { ShaderRun } from './ShaderRun';

interface PreviewProps {
  code: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: '100%', height: '100%' }}
    >
      {value === index && <Box sx={{ p: 0, width: '100%', height: '100%' }}>{children}</Box>}
    </div>
  );
}

export function Preview({ code }: PreviewProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1e1e1e',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#2c2c2c' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="preview tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Visual Preview" />
          <Tab label="WGSL Code" />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <CustomTabPanel value={tabIndex} index={0}>
          <ShaderRun code={code} />
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          <Paper
            component="pre"
            elevation={0}
            sx={{
              width: '100%',
              height: '100%',
              m: 0,
              p: 2,
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              bgcolor: 'transparent',
              color: '#a9b7c6',
            }}
          >
            {code || '// Click Compile to generate shader code'}
          </Paper>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
