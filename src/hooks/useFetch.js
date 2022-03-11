import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    () => {
      console.log(options);

      const controller = new AbortController();

      const fetchData = async () => {
        setIsPending(true);

        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const data = await res.json();

          setIsPending(false);
          setData(data);
          setError(null);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("the fetch was aborted");
          } else {
            setIsPending(false);
            setError("Could not fetch the data");
            console.log(err.message);
          }
        }
      };

      fetchData();

      return () => {
        controller.abort();
      };
    },
    [url, options],
    options
  );

  return { data, isPending, error };
};
