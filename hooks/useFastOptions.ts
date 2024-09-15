import { fetchFastOptions } from "@/api/fasts";
import { FastOptionsDocument } from "@/types/fastTypes";
import { useEffect, useState } from "react";

const useFastOptions = () => {
  const [fastOptions, setFastOptions] = useState<FastOptionsDocument[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const fastOptions = await fetchFastOptions();
        if (!fastOptions) {
          setIsError(true);
          return;
        }
        setFastOptions(fastOptions);
      })();
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fastOptions,
    isError,
    isLoading,
  };
};

export default useFastOptions;
