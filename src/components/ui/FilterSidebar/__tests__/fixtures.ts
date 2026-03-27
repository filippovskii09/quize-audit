import type { FilterGroup } from '../types';

export const FILTER_SIDEBAR_FIXTURES = {
  defaults: {
    title: 'Filters',
  },
  group: {
    id: 'category',
    title: 'Category',
    options: {
      frontend: { label: 'Frontend', value: 'frontend', count: 4 },
      backend: { label: 'Backend', value: 'backend', count: 2 },
    },
  },
  testIds: {
    sidebar: 'filter-sidebar',
  },
} as const;

export const FILTER_SIDEBAR_GROUPS: FilterGroup[] = [
  {
    id: FILTER_SIDEBAR_FIXTURES.group.id,
    title: FILTER_SIDEBAR_FIXTURES.group.title,
    options: [FILTER_SIDEBAR_FIXTURES.group.options.frontend, FILTER_SIDEBAR_FIXTURES.group.options.backend],
  },
];

export const FILTER_SIDEBAR_SELECTED_VALUES = {
  activeFrontend: {
    [FILTER_SIDEBAR_FIXTURES.group.id]: [FILTER_SIDEBAR_FIXTURES.group.options.frontend.value],
  },
};
