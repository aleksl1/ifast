import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FastOptionsList from "@/components/FastOptionsList"; // Adjust the path to your component
import { fastDurations } from "@/constants/fastOptions";
import { FastDetails, FastLevel } from "@/types/fastTypes";
import { storage } from "@/store/mmkvStorage";
import { showAlert } from "@/utils/utils";

jest.mock("@/store/mmkvStorage");
jest.mock("@/utils/utils");

const mockSelectedFast: FastDetails = {
  label: "post 16 godzinny",
  value: 16,
  totalTimeSeconds: 0,
  level: FastLevel.Beginner,
};

describe("FastOptionsList", () => {
  const mockOnChipPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of chips", () => {
    const { getAllByTestId } = render(
      <FastOptionsList
        onChipPress={mockOnChipPress}
        selectedFast={mockSelectedFast}
      />,
    );
    const chips = getAllByTestId("chip");
    expect(chips.length).toBe(Object.keys(fastDurations).length);
  });

  it("displays the correct label on each chip", () => {
    const { getByText } = render(
      <FastOptionsList
        onChipPress={mockOnChipPress}
        selectedFast={mockSelectedFast}
      />,
    );
    Object.values(fastDurations).forEach((fastDetail) => {
      expect(getByText(fastDetail.label)).toBeTruthy();
    });
  });

  it("calls onChipPress with correct FastDetails when a chip is pressed", () => {
    const { getByText } = render(
      <FastOptionsList
        onChipPress={mockOnChipPress}
        selectedFast={mockSelectedFast}
      />,
    );
    const chipLabel = getByText("post 18 godzinny"); // Select a chip different from the selected one
    fireEvent.press(chipLabel);
    expect(mockOnChipPress).toHaveBeenCalledWith(fastDurations["18"]);
  });

  it("calls confirmSelection when a chip is pressed and a fast is in progress", () => {
    (storage.contains as jest.Mock).mockReturnValue(true); // Mock storage to indicate a fast is in progress
    const { getByText } = render(
      <FastOptionsList
        onChipPress={mockOnChipPress}
        selectedFast={mockSelectedFast}
      />,
    );
    const chipLabel = getByText("post 18 godzinny"); // Select a chip different from the selected one
    fireEvent.press(chipLabel);
    expect(showAlert).toHaveBeenCalled();
  });
});
