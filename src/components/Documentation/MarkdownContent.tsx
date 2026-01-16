'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import Link from 'next/link';
import { TipBox } from './TipBox';
import styles from './MarkdownContent.module.scss';

const extractTextFromNode = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join(' ');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return extractTextFromNode(node.props.children);
  }
  return '';
};

const CodeBlockWithCopy = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <button
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label="Copy code"
      >
        <span className={styles.copyIcon}>
          {copied ? (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </span>
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className={styles.codeBlock}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: [styles.anchor],
              },
            },
          ],
        ]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className={styles.h1} {...props} />
          ),
          h2: ({ node, ...props }) => {
            const id = props.id as string;
            return (
              <h2 id={id} className={styles.h2} {...props}>
                <a href={`#${id}`} className={styles.anchor}>
                  <span className={styles.anchorIcon}>#</span>
                </a>
                {props.children}
              </h2>
            );
          },
          h3: ({ node, ...props }) => {
            const id = props.id as string;
            return (
              <h3 id={id} className={styles.h3} {...props}>
                <a href={`#${id}`} className={styles.anchor}>
                  <span className={styles.anchorIcon}>#</span>
                </a>
                {props.children}
              </h3>
            );
          },
          p: ({ node, ...props }) => {
            return <p className={styles.p} {...props} />;
          },
          blockquote: ({ node, ...props }) => {
            // Check if blockquote contains a tip (markdown > **Tip:** ...)
            const children = props.children;
            if (children && typeof children === 'object' && 'props' in children) {
              const childProps = (children as any).props;
              if (childProps?.children) {
                const textContent = extractTextFromNode(childProps.children);
                if (textContent.match(/^Tip[^:]*:/i)) {
                  const tipMatch = textContent.match(/^(Tip[^:]*):\s*(.+)/i);
                  if (tipMatch) {
                    return (
                      <TipBox
                        key={node?.position?.start.line}
                        title={tipMatch[1] + ':'}
                        content={tipMatch[2]}
                      />
                    );
                  }
                }
              }
            }
            return <blockquote className={styles.blockquote} {...props} />;
          },
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && language) {
              return (
                <CodeBlockWithCopy code={codeString} language={language} />
              );
            }

            return (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            );
          },
          table: ({ node, ...props }) => (
            <div className={styles.tableWrapper}>
              <table className={styles.table} {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className={styles.thead} {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className={styles.tbody} {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className={styles.tr} {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className={styles.th} {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className={styles.td} {...props} />
          ),
          img: ({ node, src, alt, ...props }) => {
            if (!src) return null;
            
            // Check if it's an external URL
            if (src.startsWith('http://') || src.startsWith('https://')) {
              return (
                <img
                  src={src}
                  alt={alt || ''}
                  className={styles.img}
                  {...props}
                />
              );
            }
            
            // Use Next.js Image for local images
            return (
              <Image
                src={src}
                alt={alt || ''}
                width={800}
                height={600}
                className={styles.img}
                {...props}
              />
            );
          },
          a: ({ node, href, ...props }) => {
            if (!href) return <a {...props} />;
            
            // Internal links
            if (href.startsWith('/') || href.startsWith('#')) {
              return (
                <Link href={href} className={styles.link} {...props}>
                  {props.children}
                </Link>
              );
            }
            
            // External links
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                {...props}
              />
            );
          },
          hr: ({ node, ...props }) => <hr className={styles.hr} {...props} />,
          ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
          ol: ({ node, ...props }) => <ol className={styles.ol} {...props} />,
          li: ({ node, ...props }) => <li className={styles.li} {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className={styles.blockquote} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
