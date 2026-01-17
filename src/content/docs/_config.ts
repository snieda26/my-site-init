/**
 * Documentation structure configuration
 * This defines the sidebar structure and navigation
 */

export interface DocSection {
  id: string;
  title: {
    en: string;
    ua: string;
  };
  questions: DocQuestion[];
}

export interface DocQuestion {
  slug: string;
  title: {
    en: string;
    ua: string;
  };
}

export const docsConfig: DocSection[] = [
  {
    id: 'html-css',
    title: {
      en: 'HTML & CSS',
      ua: 'HTML & CSS',
    },
    questions: [],
  },
  {
    id: 'javascript',
    title: {
      en: 'JavaScript',
      ua: 'JavaScript',
    },
    questions: [],
  },
  {
    id: 'typescript',
    title: {
      en: 'TypeScript',
      ua: 'TypeScript',
    },
    questions: [
      {
        slug: 'decorators',
        title: {
          en: 'Decorators in TypeScript',
          ua: 'Декоратори в TypeScript',
        },
      },
      {
        slug: 'type-vs-interface',
        title: {
          en: 'Type vs Interface',
          ua: 'Type vs Interface',
        },
      },
      {
        slug: 'generic',
        title: {
          en: 'Generics',
          ua: 'Дженерики',
        },
      },
    ],
  },
  {
    id: 'react',
    title: {
      en: 'React',
      ua: 'React',
    },
    questions: [
      {
        slug: 'virtual-dom',
        title: {
          en: 'Virtual DOM',
          ua: 'Віртуальний DOM',
        },
      },
      {
        slug: 'usestate',
        title: {
          en: 'useState Hook',
          ua: 'Хук useState',
        },
      },
      {
        slug: 'useref',
        title: {
          en: 'useRef Hook',
          ua: 'Хук useRef',
        },
      },
    ],
  },
  {
    id: 'vue',
    title: {
      en: 'Vue',
      ua: 'Vue',
    },
    questions: [],
  },
  {
    id: 'angular',
    title: {
      en: 'Angular',
      ua: 'Angular',
    },
    questions: [],
  },
  {
    id: 'redux',
    title: {
      en: 'Redux',
      ua: 'Redux',
    },
    questions: [],
  },
  {
    id: 'general-questions',
    title: {
      en: 'General Questions',
      ua: 'Загальні питання',
    },
    questions: [],
  },
  {
    id: 'architecture',
    title: {
      en: 'Architecture',
      ua: 'Архітектура',
    },
    questions: [],
  },
  {
    id: 'principles',
    title: {
      en: 'Principles',
      ua: 'Принципи',
    },
    questions: [],
  },
  {
    id: 'patterns',
    title: {
      en: 'Patterns',
      ua: 'Паттерни',
    },
    questions: [],
  },
];

export function getSection(sectionId: string): DocSection | undefined {
  return docsConfig.find(s => s.id === sectionId);
}

export function getQuestionIndex(sectionId: string, questionSlug: string): number {
  const section = getSection(sectionId);
  if (!section) return -1;
  return section.questions.findIndex(q => q.slug === questionSlug);
}

export function getPrevQuestion(sectionId: string, questionSlug: string): DocQuestion | null {
  const section = getSection(sectionId);
  if (!section) return null;
  const index = getQuestionIndex(sectionId, questionSlug);
  if (index <= 0) return null;
  return section.questions[index - 1];
}

export function getNextQuestion(sectionId: string, questionSlug: string): DocQuestion | null {
  const section = getSection(sectionId);
  if (!section) return null;
  const index = getQuestionIndex(sectionId, questionSlug);
  if (index === -1 || index >= section.questions.length - 1) return null;
  return section.questions[index + 1];
}
