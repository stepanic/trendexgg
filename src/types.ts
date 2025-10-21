export type TopHolder = {
  publicKey: string;
  amount: number;
};

export type VRFResult = {
  randomness: Buffer;
  seed: string;
  tx: string;
};

export type VerifyResult = {
  randomness: Buffer;
};

export type SelectionResult = {
  winners: string[];
  vrfSeed: string;
  signature: string;
};
