import { defaultSelectedFast } from "@/constants/fastOptions";
import { storage } from "@/store/mmkvStorage";
import { getFastKey, keys } from "@/store/storageKeys";
import { FastDetails } from "@/types/fastTypes";
import { showAlert } from "@/utils/utils";
import { useEffect, useMemo, useState } from "react";

export const useFastList = () => {
  const [fastList, setFastList] = useState<FastDetails[]>([]);

  const lastSavedFastId = useMemo(() => {
    if (!storage.contains(getFastKey(1))) return 0;
    let i = 1;
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

  const clearStoredFasts = () => {
    showAlert(
      "Czy na pewno chcesz usunąć historię swoich postów?",
      "Dane zostaną utracone, jeśli jesteś w trakcie postu to zostanie on zresetowany.",
      [
        {
          text: "Usuń wszystkie dane o moich postach",
          onPress: () => storage.clearAll(),
        },
        {
          text: "Nie usuwaj",
        },
      ],
    );
    storage.set(keys.selectedFast, JSON.stringify(defaultSelectedFast));
  };

  return { fastList, clearStoredFasts };
};
