import { storage } from "@/store/mmkvStorage";
import { getFastKey, keys } from "@/store/storageKeys";

export const useSaveFastToList = () => {
  const storedFastJson = storage.getString(keys.selectedFast);

  const getNewFastStorageId = () => {
    let i = 1;
    while (storage.contains(getFastKey(i))) {
      i++;
    }
    return i;
  };

  const save = () =>
    storedFastJson &&
    storage.set(
      getFastKey(getNewFastStorageId()),
      JSON.stringify(JSON.parse(storedFastJson)),
    );

  return { save };
};
