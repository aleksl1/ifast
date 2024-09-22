import { fetchFastOptions } from "@/api/fasts";
import { useAuth } from "@/contexts/AuthContext";
import { FastOptionsDocument } from "@/types/fastTypes";
import { useEffect, useState } from "react";

const useFastOptions = () => {
  const [fastOptions, setFastOptions] = useState<FastOptionsDocument[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

  return {
    fastOptions,
    isError,
    isLoading,
  };
};

export default useFastOptions;
