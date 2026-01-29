'use client';

import { Editor, OnMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Code2, Layers, Check, Lock, Play, Clock } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRunCode: () => void;
  onSaveSolution?: () => void;
  isRunning: boolean;
  isSaving?: boolean;
  allTestsPassed?: boolean;
  attemptCount?: number;
  isSolved?: boolean;
  activeTab?: 'code' | 'solution';
  onTabChange?: (tab: 'code' | 'solution') => void;
  solution?: string;
}

export function CodeEditor({ 
  code, 
  onChange, 
  onRunCode, 
  onSaveSolution,
  isRunning, 
  isSaving = false,
  allTestsPassed = false,
  attemptCount = 0,
  isSolved = false,
  activeTab = 'code',
  onTabChange,
  solution = ''
}: CodeEditorProps) {
  const { theme } = useTheme();
  
  // Solution is unlocked after 5 attempts or if problem is solved
  const isSolutionUnlocked = attemptCount >= 5 || isSolved;

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Define custom theme matching the design system
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
      ],
      colors: {
        'editor.background': '#0a0a0a', // Slight background for better rendering
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
            onClick={() => onTabChange?.('code')}
          >
            <Code2 size={16} />
            Your Code
          </button>
          {isSolutionUnlocked ? (
            <button 
              className={`${styles.tab} ${activeTab === 'solution' ? styles.active : ''}`}
              onClick={() => onTabChange?.('solution')}
            >
              <Layers size={16} />
              Solution
              <Check size={14} strokeWidth={2.5} className={styles.checkIcon} />
            </button>
          ) : (
            <Tooltip 
              content={`To see the solution, solve the problem or make 5 attempts (${attemptCount}/5)`}
              position="bottom"
              maxWidth={280}
            >
              <span>
                <button className={`${styles.tab} ${styles.locked}`} disabled>
                  <Lock size={16} />
                  Solution
                  <Lock size={12} />
                </button>
              </span>
            </Tooltip>
          )}
        </div>
        <button 
          className={`${styles.runButton} ${isRunning || isSaving ? styles.running : ''} ${allTestsPassed ? styles.success : ''}`}
          onClick={allTestsPassed && onSaveSolution ? onSaveSolution : onRunCode}
          disabled={isRunning || isSaving}
        >
          {isRunning ? (
            <>
              <div className={styles.buttonSpinner} />
              Running
            </>
          ) : isSaving ? (
            <>
              <div className={styles.buttonSpinner} />
              Saving
            </>
          ) : allTestsPassed ? (
            <>
              <Check size={16} strokeWidth={3} />
              Done
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              Run
            </>
          )}
        </button>
      </div>

      <div className={styles.editorWrapper}>
        {activeTab === 'code' ? (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
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
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Monaco', 'Consolas', monospace",
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
            bracketPairColorization: {
              enabled: true,
            },
            // Fix potential rendering issues
            fixedOverflowWidgets: true,
            disableLayerHinting: false,
            renderWhitespace: 'selection',
          }}
            loading={
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Loading editor...</p>
              </div>
            }
          />
        ) : (
          <div className={styles.solutionView}>
            <div className={styles.solutionHeader}>
              <Clock size={20} />
              <h3>Official Solution</h3>
            </div>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={solution || '// No solution available yet'}
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
                folding: true,
                lineDecorationsWidth: 5,
                lineNumbersMinChars: 3,
                padding: { top: 16, bottom: 16 },
                fontFamily: "'JetBrains Mono', 'Monaco', 'Consolas', monospace",
                fontLigatures: true,
                cursorBlinking: 'smooth',
                renderLineHighlight: 'gutter',
                hideCursorInOverviewRuler: true,
                overviewRulerBorder: false,
                fixedOverflowWidgets: true,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                  useShadows: false,
                },
              }}
              loading={
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                  <p>Loading solution...</p>
                </div>
              }
            />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <span>JavaScript</span>
          <span>•</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
