import FastOptionsList from "@/components/FastOptionsList";
import SelectedFastInformation from "@/components/SelectedFastInformation";
import Timer from "@/components/Timer/Timer";
import { fastDurations } from "@/constants/fastOptions";
import { storage } from "@/store/mmkvStorage";
import { globalStyles } from "@/styles/globalStyles";
import { FastDetails } from "@/types/fastTypes";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Dialog, Divider, FAB } from "react-native-paper";

const defaultSelectedFast = fastDurations[16];

export default function TabOneScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedFast, setSelectedFast] = useState<FastDetails>();
  const [shouldResetTimerState, setShouldResetTimerState] = useState(false);

  const onFastOptionSelect = (fast: FastDetails) => {
    setSelectedFast(fast);
    storage.set("selectedFast", JSON.stringify(fast));
    setDialogVisible(false);
    setShouldResetTimerState(true);
  };

  useEffect(() => {
    if (!selectedFast) {
      if (storage.contains("selectedFast")) {
        const storedFastJson = storage.getString("selectedFast");
        if (storedFastJson) {
          const storedFast = JSON.parse(storedFastJson);
          setSelectedFast(storedFast);
        }
      } else {
        storage.set("selectedFast", JSON.stringify(defaultSelectedFast));
      }
    }
  }, [selectedFast]);

  return (
    selectedFast && (
      <View style={[globalStyles.container, { gap: 8 }]}>
        <SelectedFastInformation selectedFast={selectedFast} />
        <Divider />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Timer
            fastLength={selectedFast.value}
            reset={shouldResetTimerState}
            setReset={setShouldResetTimerState}
          />
          <FAB
            label="Wybierz post"
            style={{ position: "absolute", bottom: 16, right: 16 }}
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
