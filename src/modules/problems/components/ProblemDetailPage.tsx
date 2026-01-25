'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ProblemDescription } from './ProblemDescription';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { Confetti } from '@/components/Confetti';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import apiClient from '@/infrastructure/api/client';
import styles from './ProblemDetailPage.module.scss';

interface Problem {
  id: string;
  slug: string;
  title: string;
  titleUa?: string;
  description: string;
  descriptionUa?: string;
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
  const { isAuthenticated } = useAuth();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('// Write your solution here\n\nfunction solution() {\n  \n}\n');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
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
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsRunning(true);
    setOutput('Running tests...');
    setTestResults([]);
    setConsoleOutput('');
    setAllTestsPassed(false); // Reset on new run

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
        
        // Set test results for visual display
        setTestResults(result.testResults || []);
        setConsoleOutput(result.output || '');
        setOutput(''); // Clear text output when showing visual results

        // Check if all tests passed
        const passed = result.success && result.passedTests === result.totalTests;
        setAllTestsPassed(passed);

        // Trigger confetti if all tests passed
        if (passed) {
          // Use key increment to trigger new confetti instance
          setConfettiKey(prev => prev + 1);
        }
      } else {
        const error = await response.json();
        setOutput(`Error: ${error.message || 'Failed to run code'}`);
        setTestResults([]);
        setAllTestsPassed(false);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to run code'}`);
      setTestResults([]);
      setAllTestsPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveSolution = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save your solution');
      return;
    }

    if (!allTestsPassed) {
      toast.error('Please pass all tests first');
      return;
    }

    setIsSaving(true);
    try {
      await apiClient.post(`/problems/${slug}/submit`, {
        code,
        status: 'SOLVED',
      });
      
      toast.success('Solution saved successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save solution');
    } finally {
      setIsSaving(false);
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
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Увійдіть, щоб запустити код"
      />

      {/* Confetti Animation */}
      {confettiKey > 0 && (
        <Confetti 
          key={confettiKey}
          active={true} 
          duration={1250}
          onComplete={() => {}}
        />
      )}

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
                  onChange={(value) => {
                    setCode(value);
                    // Reset passed state when code changes
                    if (allTestsPassed) {
                      setAllTestsPassed(false);
                    }
                  }}
                  onRunCode={handleRunCode}
                  onSaveSolution={handleSaveSolution}
                  isRunning={isRunning}
                  isSaving={isSaving}
                  allTestsPassed={allTestsPassed}
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
                <OutputPanel 
                  output={output} 
                  testResults={testResults}
                  consoleOutput={consoleOutput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
