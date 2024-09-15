import useFastOptions from "@/hooks/useFastOptions";
import { FastDetails } from "@/types/fastTypes";
import { showAlert } from "@/utils/utils";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

type FastOptionsListProps = {
  onChipPress: (fast: FastDetails) => void;
  selectedFast: FastDetails;
};

const FastOptionsList: FC<FastOptionsListProps> = ({
  onChipPress,
  selectedFast,
}) => {
  const { fastOptions } = useFastOptions();
  const confirmSelection = (fastDetails: FastDetails) => {
    showAlert(
      "Czy chcesz rozpocząć inny post?",
      "Obecnie trwający post zostanie zakończony",
      [
        {
          text: "Tak, zakończ aktualny post.",
          onPress: () => onChipPress(fastDetails),
        },
        {
          text: "Anuluj wybór",
        },
      ],
    );
  };

  return (
    <View style={styles.list}>
      {Object.entries(fastOptions).map(([key, fastDetails]) => (
        <Chip
          key={key}
          icon="clock"
          style={{ padding: 4 }}
          onPress={
            () => {}
            // isFastInProgress todo
            //   ? confirmSelection(fastDetails)
            //   : onChipPress(fastDetails)
          }
          selected={selectedFast.value === fastDetails.value}
          showSelectedOverlay
        >
          {fastDetails.label}
        </Chip>
      ))}
    </View>
  );
};

export default FastOptionsList;

const styles = StyleSheet.create({
  list: {
    padding: 32,
    gap: 8,
  },
});
