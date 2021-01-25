/* eslint-disable no-template-curly-in-string */
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const snippets = {
  selectAll: {
    prefix: 's*',
    body: ['SELECT * FROM ${0:table};'],
    description: 'SELECT * FROM table',
  },
  comment: {
    prefix: 'co',
    body: ['--\n-- ${0:Comments goes here}\n--'],
    description: 'Create a comment',
  },
};

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

    const suggestions: monaco.languages.CompletionItem[] = Object.values(
      snippets
    ).map(_ => ({
      label: _.prefix,
      insertText: _.body.join('\n'),
      documentation: _.description,
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range,
    }));

    return { suggestions };
  },
});

const Snippet = () => {
  return <MonacoEditor width="800" height="600" language="sql" />;
};

export default Snippet;
