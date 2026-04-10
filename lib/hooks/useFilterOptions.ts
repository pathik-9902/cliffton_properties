import { useState, useEffect } from 'react';
import { SearchAndFilterOptions } from '@/lib/services/fetchOptions';

export function useFilterOptions() {
  const [options, setOptions] = useState<SearchAndFilterOptions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/options')
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return { options, loading };
}
