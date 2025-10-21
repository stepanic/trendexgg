import fs from "fs";
import { verifyRandomness } from "../core/vrf";
import { selectFromRandomness } from "../core/selection";
import { TopHolder } from "../types";
import { validateCliArgs, validateHolders } from "../utils/validation";

const dataFilePath: string = process.argv[2];
const selectedCount: number = Number(process.argv[3]);
const seed: string = process.argv[4];

const main = async (): Promise<void> => {
  try {
    if (!dataFilePath || !process.argv[3] || !seed) {
      console.error("❌ Usage: bun verifyWinner.ts <data-file-path> <number-of-winners> <vrf-seed>");
      process.exit(1);
    }

    validateCliArgs({ 
      dataFilePath, 
      numberOfWinners: selectedCount, 
      seed 
    });

    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Data file not found: ${dataFilePath}`);
    }

    const topHolders: TopHolder[] = JSON.parse(
      fs.readFileSync(dataFilePath, "utf-8")
    );

    validateHolders(topHolders);

    const { randomness } = await verifyRandomness(seed);
    const winners = selectFromRandomness(topHolders, randomness, selectedCount);

    console.log("\n✅ Verified winners from the seed:");
    console.log(winners);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

main();
