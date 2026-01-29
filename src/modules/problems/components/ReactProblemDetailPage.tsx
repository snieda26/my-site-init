'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Editor, OnMount } from '@monaco-editor/react';
import { ProblemDescription } from './ProblemDescription';
import { Confetti } from '@/components/Confetti';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import apiClient from '@/infrastructure/api/client';
import styles from './ReactProblemDetailPage.module.scss';

interface Problem {
  id: string;
  slug: string;
  title: string;
  titleUa?: string;
  description: string;
  descriptionUa?: string;
  difficulty: 'JUNIOR' | 'MIDDLE' | 'SENIOR';
  category: 'javascript' | 'react' | 'typescript' | 'other';
  starterCode?: string;
  solution?: string;
  companies?: Array<{ name: string }>;
}

interface UserSubmission {
  code: string;
  status: 'ATTEMPTED' | 'SOLVED';
  solvedAt: string;
}

interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info';
  args: string[];
  timestamp: number;
}

interface ReactProblemDetailPageProps {
  slug: string;
}

const DEFAULT_CSS = `* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 16px;
}

.app {
  max-width: 600px;
  margin: 0 auto;
}

button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f0f0f0;
}

button:hover {
  background: #e0e0e0;
}

input {
  padding: 8px 12px;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #eee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
`;

export function ReactProblemDetailPage({ slug }: ReactProblemDetailPageProps) {
  const { isAuthenticated, accessToken } = useAuth();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appCode, setAppCode] = useState("import './styles.css';\n\nexport default function App() {\n  // Your code here\n  \n  return (\n    <div className=\"app\">\n      <h1>Hello World</h1>\n    </div>\n  );\n}");
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [activeFile, setActiveFile] = useState<'app' | 'css'>('app');
  const [activeTab, setActiveTab] = useState<'code' | 'solution'>('code');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [outputTab, setOutputTab] = useState<'output' | 'console'>('output');
  
  // Resize state - 3 panels: description | editor | preview
  const [descriptionWidth, setDescriptionWidth] = useState(25); // percentage
  const [editorWidth, setEditorWidth] = useState(40); // percentage
  const [consoleHeight, setConsoleHeight] = useState(30); // percentage of preview panel
  const [isResizingDesc, setIsResizingDesc] = useState(false);
  const [isResizingEditor, setIsResizingEditor] = useState(false);
  const [isResizingConsole, setIsResizingConsole] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Monaco editor setup
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C084FC', fontStyle: 'bold' },
        { token: 'string', foreground: '6EE7B7' },
        { token: 'number', foreground: 'FCA5A5' },
        { token: 'function', foreground: '93C5FD' },
        { token: 'variable', foreground: 'E5E7EB' },
        { token: 'type', foreground: 'A5B4FC' },
        { token: 'identifier', foreground: 'E5E7EB' },
        { token: 'tag', foreground: 'F472B6' },
        { token: 'attribute.name', foreground: '93C5FD' },
        { token: 'attribute.value', foreground: '6EE7B7' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#E5E7EB',
        'editor.lineHighlightBackground': '#ffffff08',
        'editor.lineHighlightBorder': '#00000000',
        'editor.selectionBackground': '#6366F130',
        'editor.inactiveSelectionBackground': '#6366F120',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#A5B4FC',
        'editorCursor.foreground': '#6366F1',
        'editorWhitespace.foreground': '#374151',
        'editorIndentGuide.background': '#374151',
        'editorIndentGuide.activeBackground': '#4B5563',
        'editor.selectionHighlightBackground': '#6366F120',
        'editor.wordHighlightBackground': '#6366F115',
        'editorBracketMatch.background': '#6366F120',
        'editorBracketMatch.border': '#00000000',
      },
    });
    monaco.editor.setTheme('custom-dark');
  };

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated && accessToken && problem) {
      fetchUserSubmission();
    }
  }, [isAuthenticated, accessToken, problem?.id]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        setConsoleMessages(prev => [...prev, {
          type: event.data.method,
          args: event.data.args,
          timestamp: Date.now()
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fetchProblem = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/problems/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProblem(data);
        if (data.starterCode) {
          setAppCode(data.starterCode);
        }
      }
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserSubmission = async () => {
    try {
      const response = await apiClient.get<UserSubmission>(`/problems/${slug}/submission`);
      if (response.data) {
        // Parse saved code - might include both app and css
        try {
          const savedData = JSON.parse(response.data.code);
          if (savedData.appCode) setAppCode(savedData.appCode);
          if (savedData.cssCode) setCssCode(savedData.cssCode);
        } catch {
          // Fallback: treat as app code only
          setAppCode(response.data.code);
        }
        
        if (response.data.status === 'SOLVED') {
          setIsSolved(true);
        }
      }
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error('Failed to fetch user submission:', error);
      }
    }
  };

  // Resize handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector(`.${styles.splitContainer}`) as HTMLElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      if (isResizingDesc) {
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
        if (newWidth >= 15 && newWidth <= 40) {
          setDescriptionWidth(newWidth);
        }
      }
      
      if (isResizingEditor) {
        const newEditorRight = ((e.clientX - rect.left) / rect.width) * 100;
        const newEditorWidth = newEditorRight - descriptionWidth;
        if (newEditorWidth >= 25 && newEditorWidth <= 50) {
          setEditorWidth(newEditorWidth);
        }
      }
      
      if (isResizingConsole) {
        const previewPanel = document.querySelector(`.${styles.previewSection}`) as HTMLElement;
        if (previewPanel) {
          const previewRect = previewPanel.getBoundingClientRect();
          const newConsoleHeight = ((previewRect.bottom - e.clientY) / previewRect.height) * 100;
          if (newConsoleHeight >= 15 && newConsoleHeight <= 60) {
            setConsoleHeight(newConsoleHeight);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingDesc(false);
      setIsResizingEditor(false);
      setIsResizingConsole(false);
    };

    if (isResizingDesc || isResizingEditor || isResizingConsole) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingConsole ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingDesc, isResizingEditor, isResizingConsole, descriptionWidth]);

  const generatePreviewHTML = useCallback(() => {
    // Transform JSX to JavaScript
    const transformedCode = transformJSX(appCode);
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssCode}</style>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    // Override console methods to send to parent
    const originalConsole = { ...console };
    ['log', 'error', 'warn', 'info'].forEach(method => {
      console[method] = (...args) => {
        originalConsole[method](...args);
        parent.postMessage({
          type: 'console',
          method,
          args: args.map(arg => {
            try {
              if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
              }
              return String(arg);
            } catch {
              return String(arg);
            }
          })
        }, '*');
      };
    });

    // Error handling
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Error:', message);
      return true;
    };
  </script>
  <script type="text/babel" data-presets="react">
    const { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext } = React;
    
    ${transformedCode}
    
    try {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(App || (() => React.createElement('div', null, 'No App component exported'))));
    } catch (error) {
      console.error('Render Error:', error.message);
      document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
    }
  </script>
</body>
</html>`;
  }, [appCode, cssCode]);

  const transformJSX = (code: string): string => {
    // Remove import statements
    let transformed = code.replace(/import\s+.*?['"].*?['"];?\n?/g, '');
    // Remove export default, keep function
    transformed = transformed.replace(/export\s+default\s+/g, '');
    return transformed;
  };

  const handleRunCode = () => {
    setConsoleMessages([]);
    setPreviewKey(prev => prev + 1);
  };

  const handleMarkAsSolved = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsSaving(true);
    try {
      // Save both app code and css code
      const codeData = JSON.stringify({ appCode, cssCode });
      
      await apiClient.post(`/problems/${slug}/submit`, {
        code: codeData,
        status: 'SOLVED',
      });
      
      setIsSolved(true);
      setConfettiKey(prev => prev + 1);
      toast.success('Marked as solved!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProgress = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsSaving(true);
    try {
      const codeData = JSON.stringify({ appCode, cssCode });
      
      await apiClient.post(`/problems/${slug}/submit`, {
        code: codeData,
        status: 'ATTEMPTED',
      });
      
      toast.success('Progress saved!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const clearConsole = () => {
    setConsoleMessages([]);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading problem...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className={styles.error}>
        <h2>Problem not found</h2>
        <p>The problem you're looking for doesn't exist.</p>
      </div>
    );
  }

  const previewWidth = 100 - descriptionWidth - editorWidth;

  return (
    <div className={styles.container}>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Sign in to save your progress"
      />

      {confettiKey > 0 && (
        <Confetti 
          key={confettiKey}
          active={true} 
          duration={1250}
          onComplete={() => {}}
        />
      )}

      <div className={styles.mainContent}>
        <div className={styles.splitContainer}>
          {/* Description Panel */}
          <div 
            className={styles.descriptionPanel} 
            style={{ width: `${descriptionWidth}%` }}
          >
            <ProblemDescription problem={problem} isSolved={isSolved} />
          </div>

          <div 
            className={styles.resizeHandle} 
            onMouseDown={() => setIsResizingDesc(true)}
          />

          {/* Editor Panel */}
          <div 
            className={styles.editorPanel}
            style={{ width: `${editorWidth}%` }}
          >
            <div className={styles.editorHeader}>
              <div className={styles.tabsSection}>
                <div className={styles.fileTabs}>
                  <button 
                    className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
                    onClick={() => setActiveTab('code')}
                  >
                    {'</>'} Your Code
                  </button>
                  <button 
                    className={`${styles.tab} ${activeTab === 'solution' ? styles.active : ''}`}
                    onClick={() => setActiveTab('solution')}
                    disabled={!isSolved}
                    title={!isSolved ? 'Solve the problem to unlock solution' : ''}
                  >
                    🔓 Solution
                  </button>
                </div>
              </div>
              <button 
                className={styles.runButton}
                onClick={handleRunCode}
              >
                ▶ Run
              </button>
            </div>

            {activeTab === 'code' ? (
              <>
                <div className={styles.fileTabsRow}>
                  <button 
                    className={`${styles.fileTab} ${activeFile === 'app' ? styles.active : ''}`}
                    onClick={() => setActiveFile('app')}
                  >
                    App.js
                  </button>
                  <button 
                    className={`${styles.fileTab} ${activeFile === 'css' ? styles.active : ''}`}
                    onClick={() => setActiveFile('css')}
                  >
                    styles.css
                  </button>
                </div>
                
                <div className={styles.codeArea}>
                  <Editor
                    height="100%"
                    language={activeFile === 'app' ? 'javascript' : 'css'}
                    value={activeFile === 'app' ? appCode : cssCode}
                    onChange={(value) => {
                      if (activeFile === 'app') {
                        setAppCode(value || '');
                      } else {
                        setCssCode(value || '');
                      }
                    }}
                    theme="custom-dark"
                    onMount={handleEditorDidMount}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      folding: true,
                      lineDecorationsWidth: 5,
                      lineNumbersMinChars: 3,
                      padding: { top: 12, bottom: 12 },
                      fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
                      fontLigatures: true,
                      cursorBlinking: 'smooth',
                      cursorSmoothCaretAnimation: 'on',
                      smoothScrolling: true,
                      renderLineHighlight: 'gutter',
                      hideCursorInOverviewRuler: true,
                      overviewRulerBorder: false,
                      scrollbar: {
                        vertical: 'auto',
                        horizontal: 'auto',
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                        useShadows: false,
                      },
                      bracketPairColorization: { enabled: true },
                      fixedOverflowWidgets: true,
                    }}
                    loading={
                      <div className={styles.editorLoading}>
                        <div className={styles.spinner} />
                        <p>Loading editor...</p>
                      </div>
                    }
                  />
                </div>
              </>
            ) : (
              <div className={styles.solutionArea}>
                <Editor
                  height="100%"
                  language="javascript"
                  value={problem?.solution || '// No solution available'}
                  theme="custom-dark"
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    padding: { top: 12, bottom: 12 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
                    fontLigatures: true,
                    renderLineHighlight: 'gutter',
                    hideCursorInOverviewRuler: true,
                    overviewRulerBorder: false,
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'auto',
                      verticalScrollbarSize: 6,
                      horizontalScrollbarSize: 6,
                      useShadows: false,
                    },
                  }}
                />
              </div>
            )}

            <div className={styles.editorFooter}>
              <span className={styles.language}>JavaScript · UTF-8</span>
              <div className={styles.footerActions}>
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveProgress}
                  disabled={isSaving}
                >
                  💾 Save
                </button>
                <button 
                  className={`${styles.solvedButton} ${isSolved ? styles.isSolved : ''}`}
                  onClick={handleMarkAsSolved}
                  disabled={isSaving || isSolved}
                >
                  {isSolved ? '✓ Solved' : 'Mark as Solved'}
                </button>
              </div>
            </div>
          </div>

          <div 
            className={styles.resizeHandle} 
            onMouseDown={() => setIsResizingEditor(true)}
          />

          {/* Preview Panel */}
          <div 
            className={styles.previewPanel}
            style={{ width: `${previewWidth}%` }}
          >
            <div className={styles.previewSection} style={{ height: `${100 - consoleHeight}%` }}>
              <div className={styles.previewHeader}>
                <span>📱 Preview</span>
                <button 
                  className={styles.refreshButton}
                  onClick={handleRunCode}
                  title="Refresh preview"
                >
                  🔄
                </button>
              </div>
              <div className={styles.previewContent}>
                <iframe
                  ref={iframeRef}
                  key={previewKey}
                  srcDoc={generatePreviewHTML()}
                  className={styles.previewIframe}
                  sandbox="allow-scripts allow-modals"
                  title="Preview"
                />
              </div>
            </div>

            <div 
              className={styles.resizeHandleHorizontal}
              onMouseDown={() => setIsResizingConsole(true)}
            />

            <div className={styles.consoleSection} style={{ height: `${consoleHeight}%` }}>
              <div className={styles.consoleHeader}>
                <div className={styles.consoleTabs}>
                  <button
                    className={`${styles.consoleTab} ${outputTab === 'output' ? styles.active : ''}`}
                    onClick={() => setOutputTab('output')}
                  >
                    <span className={styles.checkIcon}>✓</span> Output
                  </button>
                  <button
                    className={`${styles.consoleTab} ${outputTab === 'console' ? styles.active : ''}`}
                    onClick={() => setOutputTab('console')}
                  >
                    {'>'} Console
                  </button>
                </div>
                <button 
                  className={styles.clearButton}
                  onClick={clearConsole}
                  title="Clear console"
                >
                  Clear
                </button>
              </div>
              <div className={styles.consoleContent}>
                {outputTab === 'output' ? (
                  <div className={styles.outputContent}>
                    <div className={styles.outputPlaceholder}>
                      <span className={styles.outputIcon}>▶</span>
                      <span>Click "Run" to execute your code and see the preview</span>
                    </div>
                  </div>
                ) : (
                  consoleMessages.length === 0 ? (
                    <div className={styles.consolePlaceholder}>
                      Console output will appear here...
                    </div>
                  ) : (
                    consoleMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`${styles.consoleMessage} ${styles[msg.type]}`}
                      >
                        <span className={styles.consoleIcon}>
                          {msg.type === 'error' ? '❌' : msg.type === 'warn' ? '⚠️' : '›'}
                        </span>
                        <span className={styles.consoleText}>
                          {msg.args.join(' ')}
                        </span>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
