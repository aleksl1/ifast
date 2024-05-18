import { renderHook } from "@testing-library/react-native";
import { useSaveFastToList } from "./useSaveFastToList";
import { FastDetails, FastLevel } from "@/types/fastTypes";

const mockFast: FastDetails = {
  label: "post 16 godzinny",
  value: 16,
  totalTimeSeconds: 0,
  level: FastLevel.Beginner,
};

describe("useSaveFastToList", () => {
  it("returns save function", () => {
    const { result } = renderHook(() => useSaveFastToList());

    expect(typeof result.current.save).toBe("function");
  });

  it("calling save saves fast to MMKV storage", () => {
    const { result } = renderHook(() => useSaveFastToList());
    // result.current.save()
    // const saved
    // expect()
  });
});
