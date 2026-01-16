'use client';

import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import styles from './QuestionList.module.scss';

interface QuestionListProps {
  category: string;
}

// Mock data - in real app, this would come from an API or data source
const getQuestionsForCategory = (category: string) => {
  // This is placeholder data - replace with actual data fetching
  const questions = [
    { id: 1, title: 'What is TypeScript for, its pros and cons?' },
    { id: 2, title: 'What are the differences between type and interface in TypeScript?' },
    { id: 3, title: 'What are Generics in TypeScript?' },
    { id: 4, title: 'What are Union Types in TypeScript?' },
    { id: 5, title: 'What are the differences between any and unknown in TypeScript?' },
    { id: 6, title: 'What is Type Guard in TypeScript?' },
    { id: 7, title: 'What is the never type in TypeScript?' },
    { id: 8, title: 'What is the infer keyword in TypeScript?' },
    { id: 9, title: 'How do keyof and typeof work in TypeScript?' },
    { id: 10, title: 'What is the Record Utility Type in TypeScript?' },
  ];

  return questions;
};

export const QuestionList = ({ category }: QuestionListProps) => {
  const questions = getQuestionsForCategory(category);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questions}>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isExpanded={expandedQuestion === question.id}
            onToggle={() => toggleQuestion(question.id)}
          />
        ))}
      </div>
    </div>
  );
};
