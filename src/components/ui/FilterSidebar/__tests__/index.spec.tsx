import { render, screen, userEvent, within, jest } from '@setupTest';

import { FilterSidebar } from '..';
import { FILTER_SIDEBAR_FIXTURES, FILTER_SIDEBAR_GROUPS, FILTER_SIDEBAR_SELECTED_VALUES } from './fixtures';

describe('FilterSidebar', () => {
  it('renders filter groups and all options', () => {
    const { defaults, group, testIds } = FILTER_SIDEBAR_FIXTURES;

    render(<FilterSidebar groups={FILTER_SIDEBAR_GROUPS} selectedValues={{}} onChange={jest.fn()} />);

    const sidebar = screen.getByTestId(testIds.sidebar);
    const sidebarScope = within(sidebar);

    expect(sidebarScope.getByRole('heading', { name: defaults.title })).toBeInTheDocument();
    expect(sidebarScope.getByRole('heading', { name: group.title })).toBeInTheDocument();
    expect(sidebarScope.getByRole('checkbox', { name: group.options.frontend.label })).toBeInTheDocument();
    expect(sidebarScope.getByRole('checkbox', { name: group.options.backend.label })).toBeInTheDocument();
  });

  it('calls onChange with payload when option is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { group } = FILTER_SIDEBAR_FIXTURES;

    render(<FilterSidebar groups={FILTER_SIDEBAR_GROUPS} selectedValues={{}} onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox', { name: group.options.backend.label }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      groupId: group.id,
      optionValue: group.options.backend.value,
      checked: true,
    });
  });

  it('shows active state via checked inputs based on selectedValues', () => {
    const { group } = FILTER_SIDEBAR_FIXTURES;
    render(
      <FilterSidebar
        groups={FILTER_SIDEBAR_GROUPS}
        selectedValues={FILTER_SIDEBAR_SELECTED_VALUES.activeFrontend}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole('checkbox', { name: group.options.frontend.label })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: group.options.backend.label })).not.toBeChecked();
  });
});
