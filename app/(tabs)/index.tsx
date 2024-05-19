import FastOptionsList from "@/components/FastOptionsList";
import SelectedFastInformation from "@/components/SelectedFastInformation";
import Timer from "@/components/Timer/Timer";
import { defaultSelectedFast } from "@/constants/fastOptions";
import { storage } from "@/store/mmkvStorage";
import { globalStyles } from "@/styles/globalStyles";
import { FastDetails } from "@/types/fastTypes";
import { getSecondsFromStartToNow, showAlert } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMMKVNumber } from "react-native-mmkv";
import { Button, Dialog, Divider, FAB } from "react-native-paper";
import { router } from "expo-router";
import { useSaveFastToList } from "@/hooks/useSaveFastToList";
import { keys } from "@/store/storageKeys";

export default function TabOneScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedFast, setSelectedFast] = useState<FastDetails>();
  const [shouldResetTimerState, setShouldResetTimerState] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [savedTime] = useMMKVNumber(keys.savedTime);
  const [initialTimerValue, setInitialTimerValue] = useState(0);
  const { save } = useSaveFastToList();

  const onFastOptionSelect = (fast: FastDetails) => {
    setSelectedFast(fast);
    storage.set(keys.selectedFast, JSON.stringify(fast));
    setDialogVisible(false);
    setShouldResetTimerState(true);
  };

  const onEnd = () => {
    setIsStarted(false);
    storage.delete(keys.savedTime);
    setInitialTimerValue(0);
    setShouldResetTimerState(true);
  };

  const onStart = () => {
    if (!selectedFast) return;
    const startedFast = {
      ...selectedFast,
      startTimestamp: new Date().getTime(),
    };
    setSelectedFast(startedFast);
    storage.set(keys.selectedFast, JSON.stringify(startedFast));
    setIsStarted(true);
  };

  const onFastCompleted = useCallback(() => {
    storage.delete(keys.savedTime);
    showAlert("Gratulacje", "ukończono post!");
    onEnd();
    console.log("save??");
    save();
    router.navigate("/list");
  }, [save]);

  useEffect(() => {
    if (selectedFast?.startTimestamp) {
      setInitialTimerValue(
        getSecondsFromStartToNow(selectedFast.startTimestamp),
      );
      setIsStarted(true);
    }
  }, [selectedFast?.startTimestamp]);

  useEffect(() => {
    if (!savedTime || !selectedFast?.totalTimeSeconds) return;
    if (savedTime > selectedFast?.totalTimeSeconds) onFastCompleted();
  }, [
    onFastCompleted,
    savedTime,
    selectedFast,
    selectedFast?.totalTimeSeconds,
  ]);

  useEffect(() => {
    if (!selectedFast) {
      if (storage.contains(keys.selectedFast)) {
        const storedFastJson = storage.getString(keys.selectedFast);
        if (storedFastJson) {
          const storedFast = JSON.parse(storedFastJson);
          setSelectedFast(storedFast);
        }
      } else {
        storage.set(keys.selectedFast, JSON.stringify(defaultSelectedFast)); //todo: move to hook
      }
    }
  }, [selectedFast]);

  return (
    selectedFast && (
      <View style={styles.container}>
        <SelectedFastInformation selectedFast={selectedFast} />
        <Divider />
        <View style={styles.timerContainer}>
          <Timer
            fastLength={selectedFast.value}
            reset={shouldResetTimerState}
            setReset={setShouldResetTimerState}
            isStarted={isStarted}
            initialValue={initialTimerValue}
          />
          {isStarted ? (
            <Button mode="contained" onPress={onEnd}>
              Zakończ post
            </Button>
          ) : (
            <Button mode="contained" onPress={onStart}>
              Zacznij post
            </Button>
          )}
          <FAB
            label="Wybierz post"
            style={styles.fab}
            onPress={() => setDialogVisible(true)}
            variant="secondary"
            icon="book-search-outline"
            size="large"
          />
        </View>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <FastOptionsList
            onChipPress={onFastOptionSelect}
            selectedFast={selectedFast}
          />
        </Dialog>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: { ...globalStyles.container, gap: 8 },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  fab: { position: "absolute", bottom: 16, right: 16 },
});
