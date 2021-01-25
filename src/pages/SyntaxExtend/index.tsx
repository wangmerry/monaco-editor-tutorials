import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { language } from 'monaco-editor/esm/vs/basic-languages/sql/sql';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// 1. Support keyword 'sort_array'
language.keywords = language.keywords.concat(['SORT_ARRAY']);

// 2. Support double quotes for strings
// eslint-disable-next-line @typescript-eslint/camelcase
language.tokenizer.string_double = [
  [/[^"]+/, 'string'],
  [/""/, 'string'],
  [/"/, { token: 'string', next: '@pop' }],
];

language.tokenizer.strings.push([
  /"/,
  { token: 'string', next: '@string_double' },
]);

const SyntaxExtend = () => {
  const mouseDownTimeRef = useRef<any>(null);
  const mouseDownPositionRef = useRef<any>(null);

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // 3. Support double-click near the bracket, select the content inside the bracket
    editor.onMouseDown(e => {
      if (e.event.buttons === 1) {
        if (!mouseDownTimeRef.current) {
          mouseDownTimeRef.current = Date.now();
          mouseDownPositionRef.current = editor.getPosition();
        } else {
          const prePositon = mouseDownPositionRef.current;
          const lineContent = editor.getValue().split('\n');
          const currentLine = lineContent[prePositon.lineNumber - 1];
          const preWord = currentLine.substr(prePositon.column - 2, 1);
          const nextWord = currentLine.substr(prePositon.column - 1, 1);
          const cases = [Date.now() - mouseDownTimeRef.current < 300];
          const model = editor.getModel() as any;
          if (cases.every(Boolean)) {
            // @see https://github.com/microsoft/monaco-editor/issues/1386
            const match = model.matchBracket(prePositon);
            if (match) {
              if (preWord === '(' || preWord === ')') {
                editor.setSelection(
                  new monaco.Range(
                    match[0].endLineNumber,
                    match[0].endColumn,
                    match[1].startLineNumber,
                    match[1].startColumn
                  )
                );
              } else if (nextWord === '(' || nextWord === ')') {
                editor.setSelection(
                  new monaco.Range(
                    match[0].startLineNumber,
                    match[0].startColumn,
                    match[1].endLineNumber,
                    match[1].endColumn
                  )
                );
              } else {
                return;
              }
            }
            mouseDownTimeRef.current = null;
            mouseDownPositionRef.current = null;
          } else {
            mouseDownTimeRef.current = Date.now();
            mouseDownPositionRef.current = editor.getPosition();
          }
        }
      }
    });
  };

  const defaultValue = `select * from
  (select *
   from b);
  `;

  return (
    <MonacoEditor
      value={defaultValue}
      editorDidMount={handleEditorMount}
      width="800"
      height="600"
      language="sql"
      theme="vs-dark"
    />
  );
};
export default SyntaxExtend;
