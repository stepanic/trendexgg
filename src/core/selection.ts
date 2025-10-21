import {
  distributeSlots,
  generateRandomNumberFromRandomness,
} from "../utils/utils";
import { TopHolder } from "../types";
import { MAX_WINNERS } from "../config/constants";

export const selectFromRandomness = (
  topHolders: TopHolder[],
  randomness: Buffer | Uint8Array,
  numberOfSelection: number
): string[] => {
  if (numberOfSelection <= 0) {
    throw new Error("Number of selections must be greater than 0");
  }

  if (numberOfSelection > MAX_WINNERS) {
    throw new Error(`Cannot select more than ${MAX_WINNERS} winners`);
  }

  const luckyDrawSlots = distributeSlots(topHolders);

  if (luckyDrawSlots.length === 0) {
    throw new Error("No valid slots available for selection");
  }

  if (numberOfSelection > luckyDrawSlots.length) {
    throw new Error(
      `Cannot select ${numberOfSelection} winners from ${luckyDrawSlots.length} available slots`
    );
  }

  const result: string[] = [];
  let remainingSlots = [...luckyDrawSlots];

  for (let i = 0; i < numberOfSelection; i++) {
    const randomIndex = generateRandomNumberFromRandomness(
      randomness,
      remainingSlots.length,
      i
    );
    const winnerAddress = remainingSlots[randomIndex];
    result.push(winnerAddress);
    remainingSlots = remainingSlots.filter((slot) => slot !== winnerAddress);
  }

  return result;
};
