import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.header.title',
    defaultMessage: 'AuditTool',
  },
  adminAccess: {
    id: 'app.header.adminAccess',
    defaultMessage: 'Admin Access',
  },
  homeTitle: {
    id: 'app.home.title',
    defaultMessage: 'Technical Knowledge Audit',
  },
  homeDescription: {
    id: 'app.home.description',
    defaultMessage:
      'Assess your technical knowledge across various domains including Frontend, Backend, Database, and DevOps.',
  },
  startBtn: {
    id: 'app.home.startBtn',
    defaultMessage: 'Start Audit',
  },
  exportSuccess: {
    id: 'app.export.success',
    defaultMessage: 'Export successful! Your results have been downloaded and local cache cleared.',
  },
  exportFailed: {
    id: 'app.export.failed',
    defaultMessage: 'Failed to export results. Please try again.',
  },
});
