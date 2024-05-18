import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider as PaperProvider, Portal } from "react-native-paper";
import SelectedFastInformation from "@/components/SelectedFastInformation";
import { FastDetails, FastLevel } from "@/types/fastTypes";
jest.useFakeTimers();

const mockSelectedFast: FastDetails = {
  label: "post 16 godzinny",
  value: 16,
  totalTimeSeconds: 0,
  level: FastLevel.Beginner,
};

describe("SelectedFastInformation", () => {
  it("renders button with correct label", () => {
    const { getByText } = render(
      <PaperProvider>
        <SelectedFastInformation selectedFast={mockSelectedFast} />
      </PaperProvider>,
    );

    expect(
      getByText(`Wybrany ${mockSelectedFast.label}. Dowiedz się więcej`),
    ).toBeTruthy();
  });

  it("opens modal on button press", () => {
    const { getByText } = render(
      <PaperProvider>
        <SelectedFastInformation selectedFast={mockSelectedFast} />
      </PaperProvider>,
    );

    const button = getByText(
      `Wybrany ${mockSelectedFast.label}. Dowiedz się więcej`,
    );
    fireEvent.press(button);

    expect(getByText("Różnorodność Postów Przerywanych")).toBeTruthy();
  });
});
