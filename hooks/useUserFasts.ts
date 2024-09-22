import { getFastsForUser } from "@/api/fasts";
import { useAuth } from "@/contexts/AuthContext";
import { UserFastType } from "@/types/fastTypes";
import { useEffect, useState } from "react";

const useUserFasts = () => {
  const { user, isAuthenticated } = useAuth();
  const uid = user?.uid;
  const [fasts, setFasts] = useState<UserFastType[]>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (uid) {
      setIsLoading(true);
      try {
        (async () => {
          const fasts = await getFastsForUser(uid);
          if (!fasts) {
            setIsError(true);
            return;
          }
          setFasts(fasts);
        })();
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, uid]);

  return { fasts, isError, isLoading };
};

export default useUserFasts;
