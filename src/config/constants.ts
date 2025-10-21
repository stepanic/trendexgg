export const SLOT_DIVISOR = 1000;

export const MAX_WINNERS = 64;

export const RPC_ENDPOINTS = {
  MAINNET: "https://api.mainnet-beta.solana.com",
  DEVNET: "https://api.devnet.solana.com",
} as const;

export const VRF_CONFIG = {
  BYTES_PER_SELECTION: 8,
  CONFIRMATION_LEVEL: "confirmed" as const,
} as const;

