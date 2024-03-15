import { useState, useEffect } from "react";

const useFetch = (url:string) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error:any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
