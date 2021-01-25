import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

monaco.languages.registerCompletionItemProvider('sql', {
  triggerCharacters: [],
  provideCompletionItems: (
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ) => {
    const textUntilPosition = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const match = textUntilPosition.match(/(\S+)$/);
    if (!match) return undefined;

    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const suggestions: monaco.languages.CompletionItem[] = [
      {
        kind: monaco.languages.CompletionItemKind.Text,
        label: 'TestText',
        insertText: 'TestText',
        documentation: `TestText Document`,
        detail: 'TestText Title',
        range,
      },
    ];

    return { suggestions };
  },
});

const IntelliSense = () => {
  return (
    <MonacoEditor width="800" height="600" language="sql" theme="vs-dark" />
  );
};

export default IntelliSense;
