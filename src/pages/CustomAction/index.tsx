import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// 添加右键菜单
const CustomAction = () => {
  const onRunSelection = (value: string | null) => {
    console.log('onRunSelection', value);
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    // Whether to display the'Run Selection' menu item
    const selectionCondition = editor.createContextKey(
      'selectionCondition',
      true
    );

    // Monitor Cursor Change
    editor.onDidChangeCursorSelection(({ selection }) => {
      const {
        startLineNumber,
        endLineNumber,
        startColumn,
        endColumn,
      } = selection;

      if (startLineNumber === endLineNumber && startColumn === endColumn) {
        selectionCondition.set(false);
      } else {
        selectionCondition.set(true);
      }
    });

    editor.addAction({
      precondition: 'selectionCondition',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      id: 'runSelection',
      label: 'Run Selection',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: (editor: monaco.editor.IStandaloneCodeEditor) => {
        const selection = editor.getSelection() as monaco.IRange;
        const selectValue = (editor.getModel() as monaco.editor.ITextModel).getValueInRange(
          selection
        );
        onRunSelection && onRunSelection(selectValue);
      },
    });
  };

  return (
    <MonacoEditor
      editorDidMount={handleEditorDidMount}
      width="800"
      height="600"
      language="json"
      theme="vs-dark"
    />
  );
};

export default CustomAction;
