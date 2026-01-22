'use client';

import React, { useState } from 'react';
import { LuShield, LuPlay, LuZap, LuFileCode } from 'react-icons/lu';
import styles from './PlatformPreview.module.scss';

type FileKey = 'debounce.ts' | 'throttle.ts' | 'memoize.ts';

interface FileData {
  codeLines: React.ReactNode[];
  feedback: { text: string; primary?: boolean }[];
}

const FILES: Record<FileKey, FileData> = {
  'debounce.ts': {
    codeLines: [
      <p key="1"><span className={styles.purple}>function</span> <span className={styles.yellow}>debounce</span>(fn: <span className={styles.indigo}>Function</span>, delay: <span className={styles.indigo}>number</span>) {'{'}</p>,
      <p key="2" className={styles.pl4}><span className={styles.purple}>let</span> timeoutId: <span className={styles.indigo}>ReturnType</span>&lt;<span className={styles.purple}>typeof</span> <span className={styles.blue}>setTimeout</span>&gt; | <span className={styles.indigo}>null</span>;</p>,
      <p key="3" className={`${styles.pl4} ${styles.mt1}`}><span className={styles.purple}>return function</span>(<span className={styles.blueLight}>this</span>: <span className={styles.indigo}>any</span>, ...args: <span className={styles.indigo}>any</span>[]) {'{'}</p>,
      <p key="4" className={styles.pl8}><span className={styles.purple}>if</span> (timeoutId) <span className={styles.blue}>clearTimeout</span>(timeoutId);</p>,
      <p key="5" className={`${styles.pl8} ${styles.mt1}`}>timeoutId = <span className={styles.blue}>setTimeout</span>(() <span className={styles.purple}>=&gt;</span> {'{'}</p>,
      <p key="6" className={styles.pl12}>fn.<span className={styles.blue}>apply</span>(<span className={styles.blueLight}>this</span>, args);</p>,
      <p key="7" className={styles.pl8}>{'  }'}, delay);</p>,
      <p key="8" className={styles.pl4}>{'  };'}</p>,
      <p key="9">{'}'}</p>
    ],
    feedback: [
      { text: '"Correct use of the \'this\' context and closure. How would you modify this to handle an \'immediate\' execution flag?"', primary: true },
      { text: '"Good call on clearing the timeout. Remember that some interviewers will ask about memory leaks if \'fn\' holds large references."' }
    ]
  },
  'throttle.ts': {
    codeLines: [
      <p key="1"><span className={styles.purple}>function</span> <span className={styles.yellow}>throttle</span>(fn: <span className={styles.indigo}>Function</span>, limit: <span className={styles.indigo}>number</span>) {'{'}</p>,
      <p key="2" className={styles.pl4}><span className={styles.purple}>let</span> inThrottle: <span className={styles.indigo}>boolean</span>;</p>,
      <p key="3" className={`${styles.pl4} ${styles.mt1}`}><span className={styles.purple}>return function</span>(<span className={styles.blueLight}>this</span>: <span className={styles.indigo}>any</span>, ...args: <span className={styles.indigo}>any</span>[]) {'{'}</p>,
      <p key="4" className={styles.pl8}><span className={styles.purple}>if</span> (!inThrottle) {'{'}</p>,
      <p key="5" className={styles.pl12}>fn.<span className={styles.blue}>apply</span>(<span className={styles.blueLight}>this</span>, args);</p>,
      <p key="6" className={styles.pl12}>inThrottle = <span className={styles.blueLight}>true</span>;</p>,
      <p key="7" className={`${styles.pl12} ${styles.mt1}`}><span className={styles.blue}>setTimeout</span>(() <span className={styles.purple}>=&gt;</span> inThrottle = <span className={styles.blueLight}>false</span>, limit);</p>,
      <p key="8" className={styles.pl8}>{'    }'}</p>,
      <p key="9" className={styles.pl4}>{'  };'}</p>,
      <p key="10">{'}'}</p>
    ],
    feedback: [
      { text: '"Clean implementation using a boolean flag. How would you ensure the last call is always executed after the limit expires?"', primary: true },
      { text: '"Good use of closure to maintain state. Think about the trade-offs between leading and trailing edge execution."' }
    ]
  },
  'memoize.ts': {
    codeLines: [
      <p key="1"><span className={styles.purple}>function</span> <span className={styles.yellow}>memoize</span>(fn: <span className={styles.indigo}>Function</span>) {'{'}</p>,
      <p key="2" className={styles.pl4}><span className={styles.purple}>const</span> cache = <span className={styles.purple}>new</span> <span className={styles.indigo}>Map</span>();</p>,
      <p key="3" className={`${styles.pl4} ${styles.mt1}`}><span className={styles.purple}>return function</span>(<span className={styles.blueLight}>this</span>: <span className={styles.indigo}>any</span>, ...args: <span className={styles.indigo}>any</span>[]) {'{'}</p>,
      <p key="4" className={styles.pl8}><span className={styles.purple}>const</span> key = <span className={styles.indigo}>JSON</span>.<span className={styles.blue}>stringify</span>(args);</p>,
      <p key="5" className={`${styles.pl8} ${styles.mt1}`}><span className={styles.purple}>if</span> (cache.<span className={styles.blue}>has</span>(key)) <span className={styles.purple}>return</span> cache.<span className={styles.blue}>get</span>(key);</p>,
      <p key="6" className={`${styles.pl8} ${styles.mt1}`}><span className={styles.purple}>const</span> result = fn.<span className={styles.blue}>apply</span>(<span className={styles.blueLight}>this</span>, args);</p>,
      <p key="7" className={styles.pl8}>cache.<span className={styles.blue}>set</span>(key, result);</p>,
      <p key="8" className={styles.pl8}><span className={styles.purple}>return</span> result;</p>,
      <p key="9" className={styles.pl4}>{'  };'}</p>,
      <p key="10">{'}'}</p>
    ],
    feedback: [
      { text: '"Map is a great choice for the cache. Be careful with JSON.stringify on complex objects or circular references."', primary: true },
      { text: '"Efficient lookup. In a real-world scenario, how would you implement an LRU eviction policy to prevent memory overflow?"' }
    ]
  }
};

export const PlatformPreview: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileKey>('debounce.ts');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.glowBg}></div>
          
          <div className={styles.window}>
            {/* Window Header */}
            <div className={styles.windowHeader}>
              <div className={styles.dots}>
                <div className={`${styles.dot} ${styles.dotRed}`}></div>
                <div className={`${styles.dot} ${styles.dotYellow}`}></div>
                <div className={`${styles.dot} ${styles.dotGreen}`}></div>
              </div>
              <div className={styles.windowTitle}>
                <LuShield size={10} className={styles.shieldIcon} />
                DevPrep.io / Sandbox
              </div>
              <div className={styles.spacer}></div>
            </div>

            {/* Tab Bar */}
            <div className={styles.tabBar}>
              {(Object.keys(FILES) as FileKey[]).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`${styles.tab} ${activeFile === fileName ? styles.tabActive : ''}`}
                >
                  <LuFileCode size={12} className={activeFile === fileName ? styles.tabIconActive : styles.tabIcon} />
                  <span>{fileName}</span>
                  {activeFile === fileName && (
                    <span className={styles.tabIndicator}></span>
                  )}
                </button>
              ))}
            </div>

            {/* Main Workspace */}
            <div className={styles.workspace}>
              {/* Editor */}
              <div className={styles.editor}>
                <div className={styles.lineNumbers}>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className={styles.lineNumber}>{i + 1}</div>
                  ))}
                </div>

                <div className={styles.codeArea}>
                  <div key={activeFile} className={styles.codeContent}>
                    {FILES[activeFile].codeLines.map((line, idx) => (
                      <div key={idx} className={styles.codeLine}>
                        {line}
                      </div>
                    ))}
                    <div className={styles.codeLine}>
                      <p className={styles.cursor}>_</p>
                    </div>
                  </div>
                  <div className={styles.verticalLine}></div>
                </div>
              </div>

              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                  <div className={styles.sidebarTitle}>
                    <div className={styles.sidebarDot}></div>
                    <span>AI Feedback</span>
                  </div>
                  <LuZap size={14} className={styles.zapIcon} />
                </div>
                
                <div className={styles.feedbackList} key={`${activeFile}-feedback`}>
                  {FILES[activeFile].feedback.map((f, i) => (
                    <div 
                      key={i} 
                      className={`${styles.feedbackCard} ${f.primary ? styles.feedbackPrimary : ''}`}
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      <p className={styles.feedbackText}>
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={styles.sidebarFooter}>
                  <button className={styles.executeBtn}>
                    <LuPlay size={12} fill="currentColor" />
                    <span>Execute Sandbox</span>
                  </button>
                  <p className={styles.envLabel}>Node.js 20.x Environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
