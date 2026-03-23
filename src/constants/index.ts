export const APP_MODE = {
  IDLE: 'idle',
  STUDENT: 'student',
  ADMIN: 'admin',
} as const;

export type AppModeType = (typeof APP_MODE)[keyof typeof APP_MODE];
