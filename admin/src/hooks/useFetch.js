import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

export default function useFetch({ url, method }) {
  const [fetchedData, setFetchedData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState({});

  useEffect(() => {
    (async function fetch() {
      setIsLoading(true);
      try {
        const response = await axios(url, { method });
        setFetchedData(response.data);
      } catch (err) {
        console.log(err);
        setErrors({
          message: err.response.data.error.message,
          type: err.response.data.error.details.type,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading, setFetchedData, setErrors, refetch]);

  return { fetchedData, isLoading, errors, setRefetch };
}
