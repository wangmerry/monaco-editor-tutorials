import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import testWorker from '../../worker/js-worker';
const sqliteParser = require('sqlite-parser');

const SyntaxVerify = () => {
  const [value, setValue] = useState('');
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    console.log('Handle your syntax verification logic');
    // testWorker.postMessage(value);
    // testWorker.onmessage = (e) => {
    //   console.log('9999999', e)
    //   const data = e.data;
    //   if (data.type && data.type === 'error'){
    //       const { content } = data;
    //       const { description, column, lineNumber} = content;
    //       console.log('ddddd', column);
    //       monaco.editor.setModelMarkers(
    //           editorRef.current.editor.getModel(),
    //           'SyntaxVerifyEditor',
    //           [
    //             {
    //               severity: monaco.MarkerSeverity.Error,
    //               startColumn: column,
    //               startLineNumber: lineNumber,
    //               endColumn: column,
    //               message: description,
    //               endLineNumber: lineNumber,
    //             }
    //           ]
    //         );
    //   } else {
    //     monaco.editor.setModelMarkers(
    //       editorRef.current.editor.getModel(),
    //       'SyntaxVerifyEditor',[]);
    //   }
    // }
    sqliteParser(value, (err: any, ast: any) => {
      if(!err) {
        monaco.editor.setModelMarkers( 
          editorRef.current.editor.getModel(),
          'SyntaxVerifyEditor', []);
        return ;
      }
      const {message, name, location } = err;
      console.log('99999999', err, err.message, ast)
      monaco.editor.setModelMarkers( 
        editorRef.current.editor.getModel(),
        'SyntaxVerifyEditor', [
            {
              severity: monaco.MarkerSeverity.Error,
              startColumn: location.start.offset,
              startLineNumber: location.start.line,
              endColumn: location.end.offset,
              message: message + '/n' + err.stack,
              endLineNumber: location.end.column,
            }
      ])
    });
 
  }, [value]);

  const handleChange = (value: string) => setValue(value);

  return (
    <MonacoEditor
      ref={editorRef}
      value={value}
      onChange={handleChange}
      width="800"
      height="600"
      language="sql"
      theme="vs-dark"
    />
  );
};

export default SyntaxVerify;
