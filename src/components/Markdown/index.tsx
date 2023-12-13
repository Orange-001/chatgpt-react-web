import React, { FC, memo, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMath from 'remark-math';
import RemarkBreaks from 'remark-breaks';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';

interface Props {
  content: string;
}

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState('');

  const renderMermaid = () => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector('code.language-mermaid');
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
  };

  useEffect(() => {
    setTimeout(renderMermaid, 1);
  }, [refText]);

  return (
    <>
      {/* {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />} */}
      <pre ref={ref}>
        <span
          className="copy-code-button"
          onClick={() => {
            if (ref.current) {
              const code = ref.current.innerText;
              // copyToClipboard(code);
            }
          }}
        ></span>
        {props.children}
      </pre>
    </>
  );
}

const Markdown: FC<Props> = (props) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex,
          [
            RehypeHighlight,
            {
              detect: false,
              ignoreMissing: true
            }
          ]
        ]}
        components={{
          pre: PreCode as any,
          p: (pProps) => <p {...pProps} dir="auto" />,
          a: (aProps) => {
            const href = aProps.href || '';
            const isInternal = /^\/#/i.test(href);
            const target = isInternal ? '_self' : aProps.target ?? '_blank';
            return <a {...aProps} target={target} />;
          }
        }}
      >
        {props.content}
      </ReactMarkdown>
    </div>
  );
};

export default memo(Markdown);
