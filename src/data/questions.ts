import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // Network & Web
  { id: 'q1', category: 'Network & Web', text: 'Які методи HTTP-запитів ви знаєте?' },
  { id: 'q2', category: 'Network & Web', text: 'Які знаєте коди відповіді (стану) HTTP?' },
  { id: 'q3', category: 'Network & Web', text: 'Що таке CORS?' },
  { id: 'q4', category: 'Network & Web', text: 'Що таке cookie?' },

  // JavaScript Core
  {
    id: 'q5',
    category: 'JavaScript Core',
    text: 'Чим JS відрізняється під час роботи на front-end і back-end?',
  },
  { id: 'q6', category: 'JavaScript Core', text: 'Які існують типи даних у JS?' },
  { id: 'q7', category: 'JavaScript Core', text: 'Порівняйте ключові слова var, let, const.' },
  {
    id: 'q8',
    category: 'JavaScript Core',
    text: 'Назвіть методи масивів, які пам’ятаєте, і скажіть, для чого вони потрібні.',
  },
  {
    id: 'q9',
    category: 'JavaScript Core',
    text: 'Опишіть призначення і принципи роботи з колекціями Map і Set.',
  },
  {
    id: 'q10',
    category: 'JavaScript Core',
    text: 'Що означає глибока (deep) та поверхнева (shallow) копія об’єкта? Як зробити кожну з них?',
  },
  {
    id: 'q11',
    category: 'JavaScript Core',
    text: 'Розкажіть про стрілкові функції (arrow function). В чому полягають відмінності стрілкових функцій від звичайних?',
  },
  {
    id: 'q12',
    category: 'JavaScript Core',
    text: 'Що таке замикання (closure) і які сценарії його використання?',
  },
  { id: 'q13', category: 'JavaScript Core', text: 'Що означає ключове слово this?' },
  { id: 'q34', category: 'JavaScript Core', text: 'Що таке Promise?' },
  { id: 'q35', category: 'JavaScript Core', text: 'Що таке async/await?' },

  // Browser & DOM
  { id: 'q14', category: 'Browser & DOM', text: 'Що таке DOM?' },
  { id: 'q15', category: 'Browser & DOM', text: 'Що таке LocalStorage і SessionStorage?' },

  // React
  { id: 'q16', category: 'React', text: 'Коли й для чого використовують useRef?' },
  { id: 'q17', category: 'React', text: 'Які ви знаєте методи життєвого циклу компонента?' },
  { id: 'q18', category: 'React', text: 'Що таке Virtual DOM?' },
  {
    id: 'q19',
    category: 'React',
    text: 'Перерахуйте всі бібліотеки, які використовували у зв’язці з React.',
  },
  { id: 'q20', category: 'React', text: 'Розкажіть про базовий принцип роботи React Hooks.' },
  {
    id: 'q21',
    category: 'React',
    text: 'Оптимізація React-застосунків? Як виміряти продуктивність програми?',
  },
  {
    id: 'q37',
    category: 'React',
    text: 'Які бібліотеки менеджменту стану React-застосунку ви знаєте? Навіщо вони?',
  },

  // Tooling & Build
  { id: 'q22', category: 'Tooling & Build', text: 'Для чого потрібні бандлери?' },

  // Node.js
  { id: 'q23', category: 'Node.js', text: 'Що таке streams в Node.js?' },
  { id: 'q24', category: 'Node.js', text: 'Що таке middleware?' },
  { id: 'q25', category: 'Node.js', text: 'Чому Node.js однопотоковий, а не багатопотоковий?' },

  // Architecture & Security
  { id: 'q26', category: 'Architecture & Security', text: 'Що таке REST?' },
  { id: 'q27', category: 'Architecture & Security', text: 'Що таке token based authentication?' },
  {
    id: 'q36',
    category: 'Architecture & Security',
    text: 'Чи знайомі з поняттям патерни? Які знаєте?',
  },

  // Databases
  { id: 'q28', category: 'Databases', text: 'Що таке Redis і для чого його використовують?' },
  { id: 'q29', category: 'Databases', text: 'Яка різниця між SQL і NoSQL?' },

  // DevOps & Performance
  { id: 'q30', category: 'DevOps & Performance', text: 'Що таке CI/CD? Для чого це потрібно?' },
  {
    id: 'q31',
    category: 'DevOps & Performance',
    text: 'Які є підходи оптимізації продуктивності вебсторінки?',
  },
  { id: 'q32', category: 'DevOps & Performance', text: 'Що таке Докер?' },

  // Testing
  { id: 'q33', category: 'Testing', text: 'Чи мали досвід з тестуванням?' },
];
