import { debounce, debouncedSearch } from "../utils/debounce";

describe("Debounce Functions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("debounce", () => {
    test("should delay function execution", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("should cancel previous calls when called multiple times", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      jest.advanceTimersByTime(150);

      debouncedFn();
      jest.advanceTimersByTime(150);

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(150);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("should pass arguments correctly", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn("test", 123);
      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledWith("test", 123);
    });

    test("should use default delay of 300ms", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn);

      debouncedFn();
      jest.advanceTimersByTime(299);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("should maintain context (this)", () => {
      const context = { value: "test" };
      const mockFn = jest.fn(function () {
        return this.value;
      });

      const debouncedFn = debounce(mockFn, 300);
      const result = debouncedFn.call(context);

      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("debouncedSearch", () => {
    test("should create debounced search function with 300ms delay", () => {
      const mockSearchFn = jest.fn();
      const debouncedSearchFn = debouncedSearch(mockSearchFn);

      debouncedSearchFn("test query");
      expect(mockSearchFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockSearchFn).toHaveBeenCalledWith("test query");
    });

    test("should cancel previous search calls", () => {
      const mockSearchFn = jest.fn();
      const debouncedSearchFn = debouncedSearch(mockSearchFn);

      debouncedSearchFn("query 1");
      jest.advanceTimersByTime(150);

      debouncedSearchFn("query 2");
      jest.advanceTimersByTime(150);

      expect(mockSearchFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(150);
      expect(mockSearchFn).toHaveBeenCalledWith("query 2");
      expect(mockSearchFn).not.toHaveBeenCalledWith("query 1");
    });
  });
});
