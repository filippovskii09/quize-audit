import type { FilterSidebarProps } from './types';
import { FilterSidebarGroup } from './FilterSidebarGroup';

export const FilterSidebar = ({
  groups,
  selectedValues,
  onChange,
  title = 'Filters',
  mobileOpen = false,
  onMobileClose,
  className = '',
}: FilterSidebarProps) => {
  const handleOptionToggle = (groupId: string, optionValue: string, checked: boolean): void => {
    onChange({ groupId, optionValue, checked });
  };

  const sidebarBaseClasses = [
    'fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] transform overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-xl transition-transform duration-300 ease-in-out',
    'lg:static lg:z-auto lg:w-72 lg:max-w-none lg:translate-x-0 lg:shadow-none',
    mobileOpen ? 'translate-x-0' : '-translate-x-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {mobileOpen ? (
        <button
          aria-label="Close filters overlay"
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          type="button"
          onClick={onMobileClose}
        />
      ) : null}

      <aside className={sidebarBaseClasses} data-testid="filter-sidebar">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">{title}</h2>
          <button
            className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 lg:hidden"
            type="button"
            onClick={onMobileClose}
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <FilterSidebarGroup
              key={group.id}
              group={group}
              selectedValues={selectedValues}
              onOptionToggle={handleOptionToggle}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
