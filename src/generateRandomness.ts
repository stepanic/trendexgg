import { AnchorProvider } from "@coral-xyz/anchor";
import { Orao } from "@orao-network/solana-vrf";
import "dotenv/config";
import bs58 from "bs58";
import { VRFResult } from "./types";

const provider = AnchorProvider.env();
const vrf = new Orao(provider);

export const generateRandomness = async (): Promise<VRFResult> => {
  const walletAddress = provider.wallet.publicKey.toBase58();
  console.log("Using wallet:", walletAddress);

  const requestBuilder = await vrf.request();
  const [seed, tx] = await requestBuilder.rpc();
  console.log("📢 Transaction sent:", tx);

  const result = await vrf.waitFulfilled(seed);

  const randomness = result.randomness;
  const randomnessHex = Buffer.from(randomness).toString("hex");
  const randomnessBase64 = Buffer.from(randomness).toString("base64");

  console.log("📝 Raw randomness (hex):", randomnessHex);
  console.log("📄 Raw randomness (base64):", randomnessBase64);
  console.log("\n🔧 seed used:", bs58.encode(seed));
  console.log(`signature: ${tx}`);

  return {
    randomness: Buffer.from(randomness),
    seed: bs58.encode(seed),
    tx: tx,
  };
};
