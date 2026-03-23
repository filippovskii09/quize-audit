import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.student.auditForm.title',
    defaultMessage: 'Knowledge Audit',
  },
  page: {
    id: 'app.student.auditForm.page',
    defaultMessage: 'Page {current} of {total}',
  },
  saving: {
    id: 'app.student.auditForm.saving',
    defaultMessage: 'Saving...',
  },
  saved: {
    id: 'app.student.auditForm.saved',
    defaultMessage: 'Saved locally ✓',
  },
  btnPrev: {
    id: 'app.student.auditForm.btn.prev',
    defaultMessage: 'Previous',
  },
  btnNext: {
    id: 'app.student.auditForm.btn.next',
    defaultMessage: 'Next Page',
  },
  btnFinish: {
    id: 'app.student.auditForm.btn.finish',
    defaultMessage: 'Finish & Export',
  },
  placeholder: {
    id: 'app.student.questionCard.placeholder',
    defaultMessage: 'Enter your answer here...',
  },
  unansweredError: {
    id: 'app.student.auditForm.error.unanswered',
    defaultMessage:
      'You have {count} unanswered {count, plural, one {question} other {questions}}. Please answer all before submitting.',
  },
});
