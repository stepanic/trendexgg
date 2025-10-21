import { TopHolder } from "../types";

export const distributeSlots = (topHolders: TopHolder[]): string[] => {
  const luckyDrawSlots: string[] = [];
  for (const holder of topHolders) {
    const slotsAlloted = Math.floor(holder.amount / 1000);
    luckyDrawSlots.push(...Array(slotsAlloted).fill(holder.publicKey));
  }
  return luckyDrawSlots;
};

export const generateRandomNumberFromRandomness = (
  randomness: Buffer | Uint8Array,
  max: number,
  startFrom: number = 0
): number => {
  const first8 = randomness.slice(startFrom, startFrom + 8);
  const bigInt = Buffer.from(first8).readBigUInt64BE();
  const number = Number(bigInt % BigInt(max + 1));
  return number;
};
