import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIspending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIspending(true);
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();

        setIspending(false);
        setData(json); //2nd it returns the data by setting the set
        setError(null);
      } catch (err) {
        setIspending(false);
        console.log(err.message);

        setError("Could not fetch the data");
      }
    };
    fetchData();
  }, [url]);

  return { data: data, isPending, error }; //1st it returns null,
};
//this is not a default export
//it is accpeted in curly brackets
