import { FastDetails } from "@/types/fastTypes";
import { FC } from "react";
import { Button } from "react-native-paper";

type SelectedFastInformationProps = {
  selectedFast: FastDetails;
};

const SelectedFastInformation: FC<SelectedFastInformationProps> = ({
  selectedFast,
}) => {
  return (
    <Button mode="text" icon="information">
      Wybrany {selectedFast.label}. Dowiedz się więcej
    </Button>
  );
};

export default SelectedFastInformation;
