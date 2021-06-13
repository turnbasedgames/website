import React from 'react';
import Editor from '@monaco-editor/react';

const GameEditor = () => (
  <div style={{ margin: '70px' }}>
    <Editor
      height="80vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  </div>
);

export default GameEditor;
