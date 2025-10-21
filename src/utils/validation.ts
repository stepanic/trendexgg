import { MAX_WINNERS } from "../config/constants";
import { TopHolder } from "../types";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const validateCliArgs = (args: {
  dataFilePath?: string;
  numberOfWinners?: number;
  seed?: string;
}): void => {
  const { dataFilePath, numberOfWinners, seed } = args;

  if (dataFilePath && !dataFilePath.endsWith(".json")) {
    throw new ValidationError(
      "Data file must be a JSON file (*.json)"
    );
  }

  if (numberOfWinners !== undefined) {
    if (isNaN(numberOfWinners) || numberOfWinners <= 0) {
      throw new ValidationError(
        "Number of winners must be a positive number"
      );
    }

    if (numberOfWinners > MAX_WINNERS) {
      throw new ValidationError(
        `Number of winners cannot exceed ${MAX_WINNERS}`
      );
    }
  }

  if (seed !== undefined && seed.trim().length === 0) {
    throw new ValidationError("VRF seed cannot be empty");
  }
};

export const validateHolders = (holders: TopHolder[]): void => {
  if (!Array.isArray(holders)) {
    throw new ValidationError("Holder data must be an array");
  }

  if (holders.length === 0) {
    throw new ValidationError("Holder data cannot be empty");
  }

  holders.forEach((holder, index) => {
    if (!holder.publicKey || typeof holder.publicKey !== "string") {
      throw new ValidationError(
        `Invalid publicKey at index ${index}`
      );
    }

    if (
      typeof holder.amount !== "number" ||
      holder.amount < 0 ||
      isNaN(holder.amount)
    ) {
      throw new ValidationError(
        `Invalid amount at index ${index}: ${holder.amount}`
      );
    }
  });
};

