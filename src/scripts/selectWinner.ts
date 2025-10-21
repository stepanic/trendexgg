import fs from "fs";
import { generateRandomness } from "../core/vrf";
import { selectFromRandomness } from "../core/selection";
import { TopHolder } from "../types";
import { validateCliArgs, validateHolders } from "../utils/validation";

const dataFilePath: string = process.argv[2];
const numberOfSelection: number = Number(process.argv[3]);

const main = async (): Promise<void> => {
  try {
    if (!dataFilePath || !process.argv[3]) {
      console.error("❌ Usage: bun selectWinner.ts <data-file-path> <number-of-winners>");
      process.exit(1);
    }

    validateCliArgs({ dataFilePath, numberOfWinners: numberOfSelection });

    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Data file not found: ${dataFilePath}`);
    }

    const topHolders: TopHolder[] = JSON.parse(
      fs.readFileSync(dataFilePath, "utf-8")
    );

    validateHolders(topHolders);

    const { randomness, seed, tx } = await generateRandomness();
    
    console.log(`\nTotal holders: ${topHolders.length}`);
    
    const winners = selectFromRandomness(
      topHolders,
      randomness,
      numberOfSelection
    );

    console.log("\n✅ Selection Complete!");
    console.log({
      winners: winners,
      vrfSeed: seed,
      signature: tx,
    });
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

main();
