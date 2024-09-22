import { createFastRecord } from "@/api/fasts";
import FastOptionsList from "@/components/FastOptionsList";
import SelectedFastInformation from "@/components/SelectedFastInformation";
import Timer from "@/components/Timer/Timer";
import { useAuth } from "@/contexts/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { FastOptionsDocument, UserFastStatus } from "@/types/fastTypes";
import { showAlert } from "@/utils/utils";
import { Redirect, router } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Divider, FAB } from "react-native-paper";

export default function TabOneScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [shouldResetTimerState, setShouldResetTimerState] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const savedTime = 0; //todo
  const [initialTimerValue, setInitialTimerValue] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const [selectedFast, setSelectedFast] = useState<FastOptionsDocument>();
  const onFastOptionSelect = (fast: FastOptionsDocument) => {
    setSelectedFast(fast);
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
    if (!selectedFast || !user) return;
    createFastRecord({
      userId: user?.uid,
      fastOptionId: selectedFast.value.toString(),
      startTime: new Date().getTime().toString(),
      status: UserFastStatus.ONGOING,
    });
    setIsStarted(true);
  };

  const onFastCompleted = useCallback(() => {
    //todo: handle complete
    showAlert("Gratulacje", "ukończono post!");
    onEnd();
    // todo: save fast to api
    router.navigate("/list");
  }, []);

  if (!isAuthenticated) return <Redirect href="/signin" />;

  // if (isLoading || isError) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      {selectedFast && <SelectedFastInformation selectedFast={selectedFast} />}
      <Divider />
      <View style={styles.timerContainer}>
        <Timer
          fastLength={selectedFast?.value || 0}
          reset={shouldResetTimerState}
          setReset={setShouldResetTimerState}
          isStarted={isStarted}
          initialValue={initialTimerValue}
        />
        {isStarted ? (
          <Button mode="contained" onPress={onEnd}>
            Zakończ post
          </Button>
        ) : selectedFast ? (
          <Button mode="contained" onPress={onStart}>
            Zacznij post
          </Button>
        ) : null}
        <FAB
          label="Wybierz post"
          style={styles.fab}
          onPress={() => setDialogVisible(true)}
          variant="secondary"
          icon="book-search-outline"
          size="large"
        />
      </View>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <FastOptionsList
          onChipPress={onFastOptionSelect}
          selectedFast={selectedFast}
        />
      </Dialog>
    </View>
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
