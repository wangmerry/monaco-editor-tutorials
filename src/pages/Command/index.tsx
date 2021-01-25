import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const Command = () => {
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, e => {
      console.log('handle Save');
    });
  };

  return (
    <MonacoEditor
      editorDidMount={handleEditorDidMount}
      width="800"
      height="600"
      language="sql"
      theme="vs-dark"
    />
  );
};

export default Command;
