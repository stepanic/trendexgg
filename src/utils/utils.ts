import { TopHolder } from "../types";
import { SLOT_DIVISOR, VRF_CONFIG } from "../config/constants";

export const distributeSlots = (topHolders: TopHolder[]): string[] => {
  const luckyDrawSlots: string[] = [];
  for (const holder of topHolders) {
    const slotsAlloted = Math.floor(holder.amount / SLOT_DIVISOR);
    if (slotsAlloted > 0) {
      luckyDrawSlots.push(...Array(slotsAlloted).fill(holder.publicKey));
    }
  }
  return luckyDrawSlots;
};

export const generateRandomNumberFromRandomness = (
  randomness: Buffer | Uint8Array,
  max: number,
  startFrom: number = 0
): number => {
  if (max <= 0) {
    throw new Error("Max value must be greater than 0");
  }

  const offset = startFrom * VRF_CONFIG.BYTES_PER_SELECTION;
  const slice = randomness.slice(offset, offset + VRF_CONFIG.BYTES_PER_SELECTION);
  
  if (slice.length < VRF_CONFIG.BYTES_PER_SELECTION) {
    throw new Error("Insufficient randomness bytes");
  }

  const bigInt = Buffer.from(slice).readBigUInt64BE();
  const number = Number(bigInt % BigInt(max));
  return number;
};
