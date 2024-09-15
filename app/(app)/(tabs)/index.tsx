import FastOptionsList from "@/components/FastOptionsList";
import SelectedFastInformation from "@/components/SelectedFastInformation";
import Timer from "@/components/Timer/Timer";
import { globalStyles } from "@/styles/globalStyles";
import { FastDetails } from "@/types/fastTypes";
import { getSecondsFromStartToNow, showAlert } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Divider, FAB } from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import useFastOptions from "@/hooks/useFastOptions";
import Loader from "@/components/Loader";

export default function TabOneScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [shouldResetTimerState, setShouldResetTimerState] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const savedTime = 0; //todo
  const [initialTimerValue, setInitialTimerValue] = useState(0);
  const user = useAuth();
  const { fastOptions, isError, isLoading } = useFastOptions();
  const [selectedFast, setSelectedFast] = useState<FastDetails>(fastOptions[0]);

  useEffect(() => {
    if (fastOptions?.length) {
      setSelectedFast(fastOptions[0]);
    }
  }, [fastOptions]);

  const onFastOptionSelect = (fast: FastDetails) => {
    setSelectedFast(fast);
    //todo: select option??
    setDialogVisible(false);
    setShouldResetTimerState(true);
  };

  const onEnd = () => {
    setIsStarted(false);
    //todo: end fast
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
    //todo: start fast
    setIsStarted(true);
  };

  const onFastCompleted = useCallback(() => {
    //todo: handle complete
    showAlert("Gratulacje", "ukończono post!");
    onEnd();
    // todo: save fast to api
    router.navigate("/list");
  }, []);

  useEffect(() => {
    if (selectedFast?.startTimestamp) {
      setInitialTimerValue(
        getSecondsFromStartToNow(selectedFast.startTimestamp),
      );
      setIsStarted(true);
    }
  }, [selectedFast?.startTimestamp]);

  if (isLoading || isError) return <Loader />;

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
