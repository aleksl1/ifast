import { storage } from "@/store/mmkvStorage";
import { FastDetails } from "@/types/fastTypes";
import { useEffect, useMemo, useState } from "react";

export const useFastList = () => {
  const [fastList, setFastList] = useState<FastDetails[]>([]);

  const getFastKey = (i: number) => `fastList-${i}`;

  const lastSavedFastId = useMemo(() => {
    if (!storage.contains("fastList-0")) return 0;
    let i = 0;
    while (storage.contains(getFastKey(i))) {
      i++;
    }
    return i;
  }, []);

  useEffect(() => {
    if (!lastSavedFastId) return;
    for (let i = 1; i <= lastSavedFastId; i++) {
      const fastJSON = storage.getString(getFastKey(i));
      if (!fastJSON) return;
      const fast = JSON.parse(fastJSON);
      setFastList((prev) => (prev.length ? [...prev, fast] : [fast]));
    }
  }, [lastSavedFastId]);

  return fastList;
};
