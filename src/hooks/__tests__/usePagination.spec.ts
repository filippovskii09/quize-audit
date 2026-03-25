import { renderHook, act } from '@setupTest';

import { usePagination } from '../usePagination';

describe('usePagination', () => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  const itemsPerPage = 3;

  it('should initialize with first page data', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentData).toEqual([1, 2, 3]);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
  });

  it('should go to next page when nextPage is called', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual([4, 5, 6]);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(false);
  });

  it('should not go beyond total pages when nextPage is called repeatedly', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
      result.current.nextPage(); // Should stay at page 3
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentData).toEqual([7]);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should go to previous page when prevPage is called', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.goToPage(3);
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual([4, 5, 6]);
  });

  it('should not go before page 1 when prevPage is called', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
  });

  it('should jump to a specific page when goToPage is called', () => {
    const { result } = renderHook(() => usePagination(items, itemsPerPage));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentData).toEqual([7]);
  });
});
