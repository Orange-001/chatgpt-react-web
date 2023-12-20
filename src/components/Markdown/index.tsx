import React, { FC, ReactNode, memo, useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMath from 'remark-math';
import RemarkBreaks from 'remark-breaks';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';
import { useDebouncedCallback } from 'use-debounce';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

const _Mermaid: FC<{ code: string }> = (props) => {
  return <div>{props.code}</div>;
};

const PreCode: FC<{ children: ReactNode }> = (props) => {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState('');

  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector('code.language-mermaid');
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
  }, 600);

  useEffect(() => {
    setTimeout(renderMermaid, 1);
  }, [refText]);

  return (
    <>
      {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />}
      <pre ref={ref}>
        <span
          className="copy-code-button"
          onClick={() => {
            if (ref.current) {
              const code = ref.current.innerText;
              const copyResult = copy(code);
              copyResult ? message.success('已复制到剪切板', 1) : message.error('复制失败', 1);
            }
          }}
        ></span>
        {props.children}
      </pre>
    </>
  );
};

// dollar sign conflict with latex math
function escapeDollarNumber(text: string) {
  let escapedText = '';

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || ' ';

    if (char === '$' && nextChar >= '0' && nextChar <= '9') {
      char = '\\$';
    }

    escapedText += char;
  }

  return escapedText;
}

const _MarkdownContent: FC<{ content: string }> = (props) => {
  const escapedContent = useMemo(() => escapeDollarNumber(props.content), [props.content]);

  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[RehypeKatex, [RehypeHighlight, { detect: false }]]}
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
      {escapedContent}
    </ReactMarkdown>
  );
};

const Markdown: FC<{ content: string }> = (props) => {
  return (
    <div className="markdown-body">
      <MarkdownContent content={props.content} />
    </div>
  );
};

export const Mermaid = React.memo(_Mermaid);
export const MarkdownContent = React.memo(_MarkdownContent);
export default memo(Markdown);
