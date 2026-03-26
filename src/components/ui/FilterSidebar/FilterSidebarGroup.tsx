import type { FilterGroup } from './types';

interface FilterSidebarGroupProps {
  group: FilterGroup;
  selectedValues: Record<string, string[]>;
  onOptionToggle: (groupId: string, optionValue: string, checked: boolean) => void;
}

export const FilterSidebarGroup = ({ group, selectedValues, onOptionToggle }: FilterSidebarGroupProps) => {
  const getIsChecked = (optionValue: string): boolean => {
    return selectedValues[group.id]?.includes(optionValue) ?? false;
  };

  return (
    <section aria-labelledby={`filter-group-${group.id}`}>
      <h3 id={`filter-group-${group.id}`} className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
        {group.title}
      </h3>

      <ul className="space-y-2">
        {group.options.map((option) => {
          const checked = getIsChecked(option.value);

          return (
            <li key={option.value}>
              <label
                className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors ${
                  checked ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-slate-200 hover:bg-slate-50'
                } ${option.disabled ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <span className="flex items-center gap-2">
                  <input
                    aria-label={option.label}
                    checked={checked}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    disabled={option.disabled}
                    type={group.multiSelect === false ? 'radio' : 'checkbox'}
                    name={`filter-group-${group.id}`}
                    onChange={(event) => {
                      onOptionToggle(group.id, option.value, event.currentTarget.checked);
                    }}
                  />
                  <span>{option.label}</span>
                </span>
                {option.count !== undefined ? <span className="text-xs text-slate-500">{option.count}</span> : null}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
