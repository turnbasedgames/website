import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';

const GameEditor = () => {
  useEffect(() => {
    const fs = window.require('fs');
    const files = fs.readdirSync('/', { withFileTypes: true });
    console.log(files);
    console.log('test');
  }, []);
  return (
    <div style={{ margin: '70px' }}>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
};

export default GameEditor;
