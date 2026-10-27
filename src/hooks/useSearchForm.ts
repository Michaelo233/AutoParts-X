import { useCallback, useState } from "react";

interface UseSearchFormOptions {
  initialValue?: string;
  onSubmit?: (value: string) => void;
}

/**
 * Presentation-only hook for controlled search inputs.
 *
 * @returns searchValue - Current text shown in the search input.
 * @returns handleSearchChange - Updates searchValue when users type.
 * @returns handleSubmit - Forwards the current search value to the optional submit callback.
 */
export function useSearchForm(options: UseSearchFormOptions = {}) {
  const { initialValue = "", onSubmit } = options;
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleSubmit = useCallback(
    (value: string) => {
      onSubmit?.(value);
    },
    [onSubmit]
  );

  return {
    searchValue,
    handleSearchChange,
    handleSubmit,
  };
}
