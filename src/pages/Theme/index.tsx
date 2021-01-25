import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const Theme = () => {
  const [theme, setTheme] = useState('monokai');

  useEffect(() => {
    // 1. Built-in theme.
    const defaultTheme = ['vs', 'vs-dark', 'hc-black'];
    if (defaultTheme.includes(theme)) {
      monaco.editor.setTheme(theme);
      return;
    }

    // 2. Custom theme.
    import('monaco-themes/themes/themelist.json').then((data: any) => {
      const customTheme = data.default;
      console.log('Custom Theme List', customTheme);
      if (customTheme[theme]) {
        import(`monaco-themes/themes/${customTheme[theme]}.json`).then(data => {
          const themeConfig = data.default;
          // Mimimap background. https://github.com/microsoft/monaco-editor/issues/908
          if (!themeConfig.rules.find((_: any) => _.token === '')) {
            themeConfig.rules.push({
              token: '',
              background: themeConfig.colors['editor.background'],
            });
          }
          monaco.editor.defineTheme(theme, themeConfig);
          monaco.editor.setTheme(theme);
        });
      }
    });
  }, [theme]);

  return (
    <>
      <MonacoEditor width="800" height="600" language="sql" theme={theme} />
      <input value={theme} onChange={e => setTheme(e.target.value)} />
    </>
  );
};

export default Theme;
