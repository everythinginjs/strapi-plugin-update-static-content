import { useFetchClient } from '@strapi/helper-plugin';
import { useEffect, useState } from 'react';

export default function useFetch<TData>(url: string): [TData, boolean, () => void] {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [data, setData] = useState<TData>({} as TData);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState({});
  const { get } = useFetchClient();

  function handleRefetch() {
    /* Set an object with a new reference to force a refetch on demand. */
    setRefetch({});
  }

  useEffect(() => {
    (async function fetch() {
      setIsLoading(true);
      try {
        const response = await get(url, { signal });
        setData(response.data);
      } catch (err: any) {
        const response = JSON.parse(JSON.stringify(err)).response;
        console.error(response);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [refetch]);

  return [data, isLoading, handleRefetch];
}
