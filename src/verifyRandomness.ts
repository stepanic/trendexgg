import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Orao } from "@orao-network/solana-vrf";
import bs58 from "bs58";

interface VerifyResult {
  randomness: Buffer;
}

export const verifyRandomness = async (
  seedBase58: string | Buffer
): Promise<VerifyResult> => {
  const seed =
    typeof seedBase58 === "string" ? bs58.decode(seedBase58) : seedBase58;

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const vrf = new Orao({ connection });

  console.log("🔍 Verifying VRF request with seed:", seedBase58);

  const result = await vrf.waitFulfilled(seed);

  if (!result || !result.randomness) {
    console.error("❌ VRF request not fulfilled or randomness missing.");
    process.exit(1);
  }

  const randomness = Buffer.from(result.randomness);
  const randomnessHex = randomness.toString("hex");
  const randomnessBase64 = randomness.toString("base64");

  console.log("\n✅ VRF Request Verified!");
  console.log("📊 Raw randomness (hex):", randomnessHex);
  console.log("📊 Raw randomness (base64):", randomnessBase64);

  return { randomness };
};
