'use client';

import { useEffect, useState } from 'react';
import { ProblemDescription } from './ProblemDescription';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import styles from './ProblemDetailPage.module.scss';

interface Problem {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  starterCode?: string;
  solution?: string;
  testCases?: string;
  companies?: Array<{ name: string }>;
  examples?: Array<{
    input: string;
    output: string;
  }>;
}

interface ProblemDetailPageProps {
  slug: string;
}

export function ProblemDetailPage({ slug }: ProblemDetailPageProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('// Write your solution here\n\nfunction solution() {\n  \n}\n');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // Resize state
  const [leftPanelWidth, setLeftPanelWidth] = useState(35); // percentage
  const [editorHeight, setEditorHeight] = useState(60); // percentage
  const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
  const [isResizingVertical, setIsResizingVertical] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  const fetchProblem = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/problems/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProblem(data);
        // Set starter code when problem loads
        if (data.starterCode) {
          setCode(data.starterCode);
        }
      }
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Horizontal resize (left/right panels)
  const handleMouseDownHorizontal = () => {
    setIsResizingHorizontal(true);
  };

  // Vertical resize (editor/output)
  const handleMouseDownVertical = () => {
    setIsResizingVertical(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingHorizontal) {
        const container = document.querySelector(`.${styles.splitContainer}`) as HTMLElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
          if (newWidth >= 25 && newWidth <= 60) {
            setLeftPanelWidth(newWidth);
          }
        }
      }

      if (isResizingVertical) {
        const container = document.querySelector(`.${styles.verticalSplit}`) as HTMLElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
          if (newHeight >= 30 && newHeight <= 80) {
            setEditorHeight(newHeight);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingHorizontal(false);
      setIsResizingVertical(false);
    };

    if (isResizingHorizontal || isResizingVertical) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingHorizontal ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingHorizontal, isResizingVertical]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running tests...\n');

    try {
      const response = await fetch(`http://localhost:4000/api/problems/${slug}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Format test results
        let outputText = `\n✨ Test Results\n${'='.repeat(50)}\n\n`;
        outputText += `Total Tests: ${result.totalTests}\n`;
        outputText += `Passed: ${result.passedTests}\n`;
        outputText += `Failed: ${result.totalTests - result.passedTests}\n\n`;
        outputText += `${'='.repeat(50)}\n\n`;

        result.testResults.forEach((test: any, index: number) => {
          const icon = test.passed ? '✅' : '❌';
          outputText += `${icon} Test ${index + 1}: ${test.passed ? 'PASSED' : 'FAILED'}\n`;
          outputText += `  Input: ${JSON.stringify(test.input)}\n`;
          outputText += `  Expected: ${JSON.stringify(test.expected)}\n`;
          outputText += `  Actual: ${JSON.stringify(test.actual)}\n`;
          if (test.error) {
            outputText += `  Error: ${test.error}\n`;
          }
          outputText += '\n';
        });

        if (result.output) {
          outputText += `\n📝 Console Output:\n${'='.repeat(50)}\n${result.output}\n`;
        }

        if (result.success) {
          outputText += `\n🎉 All tests passed! Great job!\n`;
        } else {
          outputText += `\n⚠️  Some tests failed. Keep trying!\n`;
        }

        setOutput(outputText);
      } else {
        const error = await response.json();
        setOutput(`❌ Error: ${error.message || 'Failed to run code'}`);
      }
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : 'Failed to run code'}`);
    } finally {
      setIsRunning(false);
    }
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

  return (
    <div className={styles.container}>
      {/* Main Content - Split Layout */}
      <div className={styles.mainContent}>
        <div className={styles.splitContainer}>
          {/* Left Panel - Problem Description */}
          <div 
            className={styles.leftPanel} 
            style={{ width: `${leftPanelWidth}%` }}
          >
            <ProblemDescription problem={problem} />
          </div>

          <div 
            className={styles.resizeHandle} 
            onMouseDown={handleMouseDownHorizontal}
          />

          {/* Right Panel - Code Editor & Output */}
          <div 
            className={styles.rightPanel}
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            <div className={styles.verticalSplit}>
              {/* Code Editor */}
              <div 
                className={styles.editorPanel}
                style={{ height: `${editorHeight}%` }}
              >
                <CodeEditor 
                  code={code} 
                  onChange={setCode}
                  onRunCode={handleRunCode}
                  isRunning={isRunning}
                />
              </div>

              <div 
                className={styles.resizeHandleHorizontal}
                onMouseDown={handleMouseDownVertical}
              />

              {/* Output Panel */}
              <div 
                className={styles.outputPanel}
                style={{ height: `${100 - editorHeight}%` }}
              >
                <OutputPanel output={output} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
