import { useAppActions } from './useApp';
import { useDebounce } from './useDebounce';
import { useEffect, useState } from "react";

export const useDebouncedSearch = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const { setQuery } = useAppActions();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => { setQuery(debouncedSearch) }, [debouncedSearch])

  return [search, setSearch];
}