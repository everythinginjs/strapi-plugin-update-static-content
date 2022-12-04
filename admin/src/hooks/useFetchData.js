import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

export default function useFetchData({ url, method }) {
  var [fetchedData, setFetchedData] = useState({});
  var [errors, setErrors] = useState({});
  var [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      let response = await axios(url, { method });
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
  }, [setIsLoading, setFetchedData]);

  return { fetchedData, isLoading, errors };
}
