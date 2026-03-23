import { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { SettingsIcon, ClipboardIcon } from '@icons';
import { APP_MODE } from '@src/constants';
import type { AppState, Answer } from '@src/types';
import { useLocalStorage } from '@src/hooks';
import { AuditForm } from '@components/student';
import { AdminDashboard } from '@components/admin';
import { QUESTIONS } from '@src/data';
import { useI18n } from '@src/i18n';
import messages from './App.messages';

export default function App() {
  const intl = useIntl();
  const { locale, toggleLocale } = useI18n();
  const [appState, setAppState] = useState<AppState>({ mode: APP_MODE.IDLE });
  const [savedAnswers, setSavedAnswers, removeAnswers] = useLocalStorage<Record<string, Answer>>('audit_answers', {});

  const handleSaveAnswer = (questionId: string, text: string) => {
    setSavedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        text,
        timestamp: Date.now(),
      },
    }));
  };

  const handleExport = () => {
    try {
      const jsonString = JSON.stringify(savedAnswers, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().split('T')[0] ?? 'export';
      a.download = `audit_results_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      removeAnswers();
      setAppState({ mode: APP_MODE.IDLE });
      alert(intl.formatMessage(messages.exportSuccess));
    } catch (error) {
      console.error('Export failed:', error);
      alert(intl.formatMessage(messages.exportFailed));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setAppState({ mode: APP_MODE.IDLE });
            }}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">KA</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              <FormattedMessage {...messages.title} />
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLocale}
              className="px-3 py-1 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors mr-2"
            >
              {locale.toUpperCase()}
            </button>
            <button
              onClick={() => {
                setAppState({ mode: appState.mode === APP_MODE.ADMIN ? APP_MODE.IDLE : APP_MODE.ADMIN });
              }}
              className={`p-2 transition-colors rounded-full ${appState.mode === APP_MODE.ADMIN ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
              title={intl.formatMessage(messages.adminAccess)}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </header>

      <main className="grow flex w-full">
        {appState.mode === APP_MODE.IDLE && (
          <div className="grow flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardIcon />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                <FormattedMessage {...messages.homeTitle} />
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                <FormattedMessage {...messages.homeDescription} />
              </p>
              <button
                onClick={() => {
                  setAppState({ mode: APP_MODE.STUDENT });
                }}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                <FormattedMessage {...messages.startBtn} />
              </button>
            </div>
          </div>
        )}

        {appState.mode === APP_MODE.STUDENT && (
          <AuditForm
            questions={QUESTIONS}
            savedAnswers={savedAnswers}
            onSaveAnswer={handleSaveAnswer}
            onFinish={handleExport}
          />
        )}

        {appState.mode === APP_MODE.ADMIN && <AdminDashboard />}
      </main>
    </div>
  );
}
