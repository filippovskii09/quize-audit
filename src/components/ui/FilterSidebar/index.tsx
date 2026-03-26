import type { FilterSidebarProps } from './types';

export const FilterSidebar = ({
  groups,
  selectedValues,
  onChange,
  title = 'Filters',
  mobileOpen = false,
  onMobileClose,
  className = '',
}: FilterSidebarProps) => {
  const getIsChecked = (groupId: string, optionValue: string): boolean => {
    return selectedValues[groupId]?.includes(optionValue) ?? false;
  };

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

      <aside className={sidebarBaseClasses}>
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
            <section key={group.id} aria-labelledby={`filter-group-${group.id}`}>
              <h3
                id={`filter-group-${group.id}`}
                className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {group.title}
              </h3>

              <ul className="space-y-2">
                {group.options.map((option) => {
                  const checked = getIsChecked(group.id, option.value);

                  return (
                    <li key={option.value}>
                      <label
                        className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors ${
                          checked ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-slate-200 hover:bg-slate-50'
                        } ${option.disabled ? 'cursor-not-allowed opacity-60' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            checked={checked}
                            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                            disabled={option.disabled}
                            type={group.multiSelect === false ? 'radio' : 'checkbox'}
                            name={`filter-group-${group.id}`}
                            onChange={(event) => {
                              handleOptionToggle(group.id, option.value, event.currentTarget.checked);
                            }}
                          />
                          <span>{option.label}</span>
                        </span>
                        {option.count !== undefined ? (
                          <span className="text-xs text-slate-500">{option.count}</span>
                        ) : null}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </aside>
    </>
  );
};
