import { useState, useRef } from 'react';

import type { Answer } from '@src/types';

export const useAdminDashboard = () => {
  const [parsedData, setParsedData] = useState<Record<string, Answer> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.name.endsWith('.json')) {
      setError('Please upload a valid JSON file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (!e.target) return;
        const result = e.target.result as string;
        const data = JSON.parse(result) as unknown;

        if (typeof data !== 'object' || data === null) {
          throw new Error('Invalid JSON format for answers.');
        }

        setParsedData(data as Record<string, Answer>);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearData = () => {
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    parsedData,
    error,
    isDragging,
    setIsDragging,
    fileInputRef,
    handleFileChange,
    handleDrop,
    clearData,
  };
};
