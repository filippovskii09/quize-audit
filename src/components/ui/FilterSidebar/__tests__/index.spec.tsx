import { render, screen, userEvent, jest } from '@setupTest';

import { FilterSidebar } from '../index';
import type { FilterGroup } from '../types';

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'category',
    title: 'Category',
    options: [
      { label: 'Frontend', value: 'frontend', count: 4 },
      { label: 'Backend', value: 'backend', count: 2 },
    ],
  },
];

describe('FilterSidebar', () => {
  it('renders filter groups and all options', () => {
    render(<FilterSidebar groups={FILTER_GROUPS} selectedValues={{}} onChange={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Frontend' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Backend' })).toBeInTheDocument();
  });

  it('calls onChange with payload when option is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<FilterSidebar groups={FILTER_GROUPS} selectedValues={{}} onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox', { name: 'Backend' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      groupId: 'category',
      optionValue: 'backend',
      checked: true,
    });
  });

  it('shows active state via checked inputs based on selectedValues', () => {
    render(<FilterSidebar groups={FILTER_GROUPS} selectedValues={{ category: ['frontend'] }} onChange={jest.fn()} />);

    expect(screen.getByRole('checkbox', { name: 'Frontend' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Backend' })).not.toBeChecked();
  });
});
