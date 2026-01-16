import { useState } from 'react';
import { Layout } from './components/Layout';
import { Preview } from './components/Preview';
import { Editor } from './components/Editor';

function App() {
  const [code, setCode] = useState<string>('');

  return <Layout preview={<Preview code={code} />} editor={<Editor onCodeChange={setCode} />} />;
}

export default App;
