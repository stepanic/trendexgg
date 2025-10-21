import {
  distributeSlots,
  generateRandomNumberFromRandomness,
} from "./utils/utils";
import { TopHolder } from "./types";

export const selectFromRandomness = (
  topHolders: TopHolder[],
  randomness: Buffer | Uint8Array,
  numberOfSelection: number
): string[] => {
  let luckyDrawSlots = distributeSlots(topHolders);
  let result: string[] = [];

  for (let i = 0; i < numberOfSelection; i++) {
    const randomNumber = generateRandomNumberFromRandomness(
      randomness,
      luckyDrawSlots.length,
      i
    );
    const winnerAddress = luckyDrawSlots[randomNumber - 1];
    result.push(winnerAddress);
    luckyDrawSlots = luckyDrawSlots.filter((slot) => slot !== winnerAddress);
  }
  return result;
};
