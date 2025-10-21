import fs from "fs";
import { verifyRandomness } from "../verifyRandomness";
import { selectFromRandomness } from "../randomSelection";
import { TopHolder } from "../types";

const dataFilePath: string = process.argv[2];
const selectedCount: number = Number(process.argv[3]);
const seed: string = process.argv[4];

const main = async (): Promise<void> => {
  const topHolders: TopHolder[] = JSON.parse(
    fs.readFileSync(dataFilePath, "utf-8")
  );
  const { randomness } = await verifyRandomness(seed);
  const winners = selectFromRandomness(topHolders, randomness, selectedCount);
  console.log("Verified winners from the seed");
  console.log(winners);
};

main();
