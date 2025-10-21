export type TopHolder = {
  publicKey: string;
  amount: number;
};

export type VRFResult = {
  randomness: Buffer;
  seed: string;
  tx: string;
};
