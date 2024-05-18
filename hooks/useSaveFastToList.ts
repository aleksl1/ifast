import { storage } from "@/store/mmkvStorage";

export const useSaveFastToList = () => {
  const storedFastJson = storage.getString("selectedFast");

  const getNewFastStorageId = () => {
    let i = 1;
    while (storage.contains(`fastList-${i}`)) {
      i++;
    }
    return i;
  };

  const save = () =>
    storage.set(
      `fastList-${getNewFastStorageId()}`,
      JSON.stringify(storedFastJson),
    );

  return { save };
};
