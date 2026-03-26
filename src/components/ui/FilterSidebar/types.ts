export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface FilterSidebarChangePayload {
  groupId: string;
  optionValue: string;
  checked: boolean;
}

export interface FilterSidebarProps {
  groups: FilterGroup[];
  selectedValues: Record<string, string[]>;
  onChange: (payload: FilterSidebarChangePayload) => void;
  title?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}

export interface FilterSidebarGroupProps {
  group: FilterGroup;
  selectedValues: Record<string, string[]>;
  onOptionToggle: (groupId: string, optionValue: string, checked: boolean) => void;
}
