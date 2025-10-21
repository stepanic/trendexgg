import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Orao } from "@orao-network/solana-vrf";
import "dotenv/config";
import bs58 from "bs58";
import { VRFResult, VerifyResult } from "../types";
import { RPC_ENDPOINTS, VRF_CONFIG } from "../config/constants";

const provider = AnchorProvider.env();
const vrf = new Orao(provider);

export const generateRandomness = async (): Promise<VRFResult> => {
  try {
    const walletAddress = provider.wallet.publicKey.toBase58();
    console.log("Using wallet:", walletAddress);

    const requestBuilder = await vrf.request();
    const [seed, tx] = await requestBuilder.rpc();
    console.log("📢 Transaction sent:", tx);

    const result = await vrf.waitFulfilled(seed);

    if (!result || !result.randomness) {
      throw new Error("Failed to get randomness from VRF oracle");
    }

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
  } catch (error) {
    console.error("❌ Error generating randomness:", error);
    throw error;
  }
};

export const verifyRandomness = async (
  seedBase58: string | Buffer,
  rpcUrl: string = RPC_ENDPOINTS.MAINNET
): Promise<VerifyResult> => {
  try {
    const seed =
      typeof seedBase58 === "string" ? bs58.decode(seedBase58) : seedBase58;

    const connection = new Connection(rpcUrl, VRF_CONFIG.CONFIRMATION_LEVEL);
    const vrf = new Orao({ connection });

    console.log("🔍 Verifying VRF request with seed:", seedBase58);

    const result = await vrf.waitFulfilled(seed);

    if (!result || !result.randomness) {
      throw new Error("VRF request not fulfilled or randomness missing");
    }

    const randomness = Buffer.from(result.randomness);
    const randomnessHex = randomness.toString("hex");
    const randomnessBase64 = randomness.toString("base64");

    console.log("\n✅ VRF Request Verified!");
    console.log("📊 Raw randomness (hex):", randomnessHex);
    console.log("📊 Raw randomness (base64):", randomnessBase64);

    return { randomness };
  } catch (error) {
    console.error("❌ Error verifying randomness:", error);
    throw error;
  }
};
