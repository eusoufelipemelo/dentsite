import { readFileSync, writeFileSync } from 'fs';

let html = readFileSync(new URL('./_body_raw.html', import.meta.url), 'utf8');

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

// 1. Remove comentários HTML
html = html.replace(/<!--[\s\S]*?-->/g, '');

// 2. style="..." -> style={{...}}
html = html.replace(/style="([^"]*)"/g, (_, css) => {
  const props = css
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const idx = decl.indexOf(':');
      let key = decl.slice(0, idx).trim();
      const val = decl.slice(idx + 1).trim();
      key = key.startsWith('--') ? `'${key}'` : camel(key);
      return `${key}: '${val}'`;
    });
  return `style={{ ${props.join(', ')} }}`;
});

// 3. Remove handlers inline on*="..."
html = html.replace(/\son[a-zA-Z]+="[^"]*"/g, '');

// 4. Remove src vazio
html = html.replace(/\ssrc=""/g, '');

// 5. Atributos kebab -> camelCase (exceto aria-/data-)
html = html.replace(/(\s)([a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)+)=/g, (m, sp, name) => {
  if (/^(aria|data)-/.test(name)) return m;
  return `${sp}${camel(name)}=`;
});

// 6. class -> className, for -> htmlFor
html = html.replace(/\sclass=/g, ' className=');
html = html.replace(/\sfor="/g, ' htmlFor="');

// 7. checked boolean -> defaultChecked
html = html.replace(/\schecked(\s|>)/g, ' defaultChecked$1');

// 8. Auto-fechar void tags
html = html.replace(/<(img|input|br|hr)\b([^>]*?)\s*\/?>/g, '<$1$2 />');

// 9. Links das páginas legais -> rotas Next
html = html.replace(/href="privacidade\.html"/g, 'href="/privacidade"');
html = html.replace(/href="termos\.html"/g, 'href="/termos"');

// Indenta o JSX dentro do fragment
const jsx = html
  .split('\n')
  .map((l) => (l.trim() ? '      ' + l : l))
  .join('\n')
  .replace(/\n{3,}/g, '\n\n');

const out = `'use client';

import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    // __EFFECT__
  }, []);

  return (
    <>
${jsx}
    </>
  );
}
`;

writeFileSync(new URL('../components/Landing.jsx', import.meta.url), out, 'utf8');
console.log('Landing.jsx gerado:', out.split('\n').length, 'linhas');
