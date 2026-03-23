import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  const TEST_KEY = 'test_key';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return initial value when local storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should initialize with value from local storage if it exists', () => {
    window.localStorage.setItem(TEST_KEY, JSON.stringify('stored_value'));

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

    expect(result.current[0]).toBe('stored_value');
  });

  it('should update state and local storage when setValue is called with a new value', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

    act(() => {
      result.current[1]('updated_value');
    });

    expect(result.current[0]).toBe('updated_value');
    expect(window.localStorage.getItem(TEST_KEY)).toBe(JSON.stringify('updated_value'));
  });

  it('should update state and local storage using a callback function', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 1));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(window.localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(2));
  });

  it('should remove item from local storage and revert to initial value on remove', () => {
    window.localStorage.setItem(TEST_KEY, JSON.stringify('stored_value'));
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

    expect(result.current[0]).toBe('stored_value');

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('initial');
    expect(window.localStorage.getItem(TEST_KEY)).toBeNull();
  });

  describe('Error handling', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      jest.restoreAllMocks();
    });

    it('should fall back to initial value when reading fails', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage reading exception');
      });

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

      expect(result.current[0]).toBe('initial');
      expect(consoleSpy).toHaveBeenCalledWith(
        `Error reading localStorage key "${TEST_KEY}":`,
        expect.any(Error)
      );
    });

    it('should display warning on console when writing fails', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage writing exception');
      });

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
      expect(consoleSpy).toHaveBeenCalledWith(
        `Error setting localStorage key "${TEST_KEY}":`,
        expect.any(Error)
      );
    });

    it('should display warning on console when removing fails', () => {
      jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage removing exception');
      });

      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));

      act(() => {
        result.current[2]();
      });

      expect(result.current[0]).toBe('initial');
      expect(consoleSpy).toHaveBeenCalledWith(
        `Error removing localStorage key "${TEST_KEY}":`,
        expect.any(Error)
      );
    });
  });
});
