# 🎰 Lucky Draw - Verifiable Random Lottery

**Official lottery script for $MODRIC token holder giveaways**

A provably fair lottery system built on Solana using **Orao VRF** for cryptographically secure and transparent winner selection.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green.svg)](https://solana.com/)
[![Orao VRF](https://img.shields.io/badge/Orao-VRF-purple.svg)](https://www.orao.network/)

## 🌟 Overview

Official decentralized lottery system for **$MODRIC token** holder giveaways with complete transparency and verifiability.

**Key Features:**

- ✅ Cryptographic randomness via Orao VRF on-chain oracle
- ✅ Weighted selection (higher holdings = higher probability)
- ✅ Public verifiability using on-chain data
- ✅ No duplicate winners in single draw
- ✅ Deterministic and reproducible results

### 🔐 Official $MODRIC Pool Creator Wallet

All $MODRIC lottery executions are performed by the verified pool creator:

```
7joaoyXCn7tvKo5vi9pVuze8Cs8FZvfcWH71r9dGeTrD
```

This public wallet address ensures transparency. All VRF transactions can be verified on Solana Explorer.

## 🏗️ How It Works

1. **Request VRF randomness** from Orao Network on-chain
2. **Distribute weighted slots** - Each holder gets `floor(amount / 1000)` slots
3. **Select winners deterministically** from randomness bytes
4. **Remove winner slots** to prevent duplicates
5. **Publish results** with VRF seed for public verification

## 📋 Prerequisites

- **Node.js** ≥ 21.0.0
- **Bun** runtime
- **Solana wallet** (keypair JSON) with SOL for fees

## 🚀 Quick Start

### Installation

```bash
git clone <repository-url>
cd lucky-draw
bun install
```

### Configuration

Create `.env` file:

```env
ANCHOR_WALLET=/path/to/your/keypair.json
ANCHOR_PROVIDER_URL=https://api.mainnet-beta.solana.com
```

### Prepare Data

Create JSON file with $MODRIC holder data (exported from project database):

```json
[
  {
    "publicKey": "6JxzufuXUEpqqyd8THdA2vdiKEWphZBEfvEHVNxTrHos",
    "amount": 844970.830114
  }
]
```

The data file contains $MODRIC token holder addresses and their token amounts.

## 💻 Usage

### Select Winners

```bash
bun run select-winner
```

Or with custom parameters:

```bash
bun src/scripts/selectWinner.ts <data-file> <number-of-winners>
```

**Example:**

```bash
bun src/scripts/selectWinner.ts data/modric_top_holders_oct_19.json 3
```

**Output:**

```
Using wallet: 7joaoyXCn7tvKo5vi9pVuze8Cs8FZvfcWH71r9dGeTrD
📢 Transaction sent: 5KxD...TxHash
📝 Raw randomness (hex): a3f2b1c4...
🔧 seed used: BvR3Np...SeedBase58

{
  winners: ['wallet1...', 'wallet2...', 'wallet3...'],
  vrfSeed: 'BvR3Np...SeedBase58',
  signature: '5KxD...TxHash'
}
```

**Important:** Save the `vrfSeed` and `signature` for verification.

### Verify Winners

Anyone can verify using the VRF seed:

```bash
bun run verify-winner
```

Or with custom parameters:

```bash
bun src/scripts/verifyWinner.ts <data-file> <winners-count> <vrf-seed>
```

**Example:**

```bash
bun src/scripts/verifyWinner.ts data/modric_top_holders_oct_19.json 3 BvR3Np...SeedBase58
```

The verification fetches the VRF result from Solana blockchain and reproduces the same selection.

## 🔬 Technical Details

**Weighted Slot Distribution:**
Each holder gets slots proportional to their token amount (1 slot per 1000 tokens).

**Selection Algorithm:**
Uses VRF randomness to select winners deterministically. Same seed always produces same results.

**Maximum:** 64 winners per draw

## 🔐 Security & Transparency

**Randomness:**

- VRF ensures unpredictability (impossible to manipulate)
- All randomness generated and recorded on-chain
- Cryptographic proofs validate randomness

**Best Practices:**

1. Verify transactions come from official wallet: `7joaoyXCn7tvKo5vi9pVuze8Cs8FZvfcWH71r9dGeTrD`
2. Take holder snapshots at announced block heights
3. Publish holder data, VRF seed, and transaction signatures
4. Allow community verification period
5. Share Solana Explorer links for transparency

## 🛠️ Development

Build: `bun run build`

Type Check: `npx tsc --noEmit`

## 🙏 Acknowledgments

- [Orao Network](https://www.orao.network/) - VRF oracle provider
- [Solana](https://solana.com/) - Blockchain platform
- [Anchor](https://www.anchor-lang.com/) - Development framework

## 📝 License

ISC License

---

**Official $MODRIC lottery - Built for fair and transparent token holder rewards**
