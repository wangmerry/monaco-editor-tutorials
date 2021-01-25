import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

monaco.languages.registerDocumentFormattingEditProvider('sql', {
  async provideDocumentFormattingEdits(model) {
    const text = model.getValue();
    console.log('Handling formatting');
    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});

monaco.languages.registerDocumentRangeFormattingEditProvider('sql', {
  async provideDocumentRangeFormattingEdits(model, range) {
    const text = model.getValueInRange(range);
    console.log('Handling formatting selection');
    return [
      {
        range,
        text,
      },
    ];
  },
});

const IntelliSense = () => {
  return (
    <MonacoEditor width="800" height="600" language="sql" theme="vs-dark" />
  );
};

export default IntelliSense;
