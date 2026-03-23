/**
 * Shared test fixtures for Button component tests.
 * Centralizes test data to avoid hardcoded magic strings in spec files.
 */
export const BUTTON_FIXTURES = {
  labels: {
    default: 'Test Button',
    clickable: 'Clickable Button',
    disabled: 'Disabled Button',
    customClass: 'Custom Class Button',
  },
} as const;
