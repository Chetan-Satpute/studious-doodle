import hljs from 'highlight.js/lib/core';
import hljsTypescript from 'highlight.js/lib/languages/typescript';

import 'highlight.js/styles/tokyo-night-dark.css';

hljs.registerLanguage('typescript', hljsTypescript);

interface Props {
  text: string;
  hlLines?: number[];
}

function Code(props: Props) {
  const {text, hlLines = []} = props;

  const html = hljs.highlight(text, {language: 'typescript'}).value;
  const htmlLines = html.split('\n').map(text => text || ' ');

  const lines = htmlLines.map((lineHtml, index) => {
    const isHighlighted = hlLines.includes(index);
    return (
      <p
        key={index + lineHtml}
        dangerouslySetInnerHTML={{__html: lineHtml}}
        className={isHighlighted ? 'highlighted-code-line' : 'code-line'}
      />
    );
  });

  return (
    <pre className="no-scrollbar m-0 flex overflow-auto">
      <code className="flex-1">{lines}</code>
    </pre>
  );
}

export default Code;
