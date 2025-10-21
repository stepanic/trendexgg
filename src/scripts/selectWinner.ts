import fs from "fs";
import { generateRandomness } from "../generateRandomness";
import { selectFromRandomness } from "../randomSelection";
import { TopHolder } from "../types";

const dataFilePath: string = process.argv[2];
const numberOfSelection: number = Number(process.argv[3]);

const main = async (): Promise<void> => {
  const topHolders: TopHolder[] = JSON.parse(
    fs.readFileSync(dataFilePath, "utf-8")
  );
  const { randomness, seed, tx } = await generateRandomness();
  console.log(`Total slots: ${topHolders.length}`);
  const winners = selectFromRandomness(
    topHolders,
    randomness,
    numberOfSelection
  );
  console.log({
    winners: winners,
    vrfSeed: seed,
    signature: tx,
  });
};

main();
