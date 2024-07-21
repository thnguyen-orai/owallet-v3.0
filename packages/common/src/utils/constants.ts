export const EVMOS_NETWORKS = ["kawaii_6886-1"];
export const EXTRA_FEE_LIMIT_TRON = 50_000_000;
export const DEFAULT_FEE_LIMIT_TRON = 150_000_000;
export const TRIGGER_TYPE = "TriggerSmartContract";
export const TRON_ID = "0x2b6653dc";
export const TRON_BIP39_PATH_PREFIX = "m/44'/195'";
export const BIP44_PATH_PREFIX = "m/44'";
export const TRON_BIP39_PATH_INDEX_0 = TRON_BIP39_PATH_PREFIX + "/0'/0/0";
import { Network as NetworkTatum } from "@tatumio/tatum";
export enum NetworkEnum {
  Cosmos = "cosmos",
  Evm = "evm",
  Bitcoin = "bitcoin",
}

export enum OasisNetwork {
  MAINNET = "oasis-mainnet",
  SAPPHIRE = "oasis-sapphire-mainnet",
  EMERALD = "oasis-emerald-mainnet",
}
export const urlTxHistory = "https://tx-history-backend.oraidex.io/";
export enum COSMOS_NETWORK {
  COSMOSHUB = "cosmoshub-4",
  OSMOSIS = "osmosis-1",
  INJECTIVE = "injective-1",
  ORAICHAIN = "Oraichain",
}

export type Network = NetworkTatum & OasisNetwork & COSMOS_NETWORK;
export const Network = { ...NetworkTatum, ...OasisNetwork, ...COSMOS_NETWORK };
export enum CosmosNetwork {
  ORAICHAIN = "oraichain",
}
export enum ChainIdEnum {
  Oraichain = "Oraichain",
  OraichainTestnet = "Oraichain-testnet",
  OraiBridge = "oraibridge-subnet-2",
  OraiBTCBridge = "oraibtc-mainnet-1",
  KawaiiCosmos = "kawaii_6886-1",
  KawaiiEvm = "0x1ae6",
  Ethereum = "0x01",
  CosmosHub = "cosmoshub-4",
  Osmosis = "osmosis-1",
  Juno = "juno-1",
  BNBChain = "0x38",
  BNBChainTestNet = "0x61",
  TRON = "0x2b6653dc",
  Oasis = "native-0x5afe",
  OasisSapphire = "0x5afe",
  OasisEmerald = "0xa516",
  BitcoinTestnet = "bitcoinTestnet",
  Bitcoin = "bitcoin",
  Injective = "injective-1",
  Neutaro = "Neutaro-1",
  Noble = "noble-1",
  Stargaze = "stargaze-1",
}

export enum KADOChainNameEnum {
  "Oraichain" = "ORAICHAIN",
  "juno-1" = "JUNO",
  "0x01" = "ETHEREUM",
  "cosmoshub-4" = "COSMOS HUB",
  "injective-1" = "INJECTIVE",
  "osmosis-1" = "OSMOSIS",
  "bitcoin" = "BITCOIN",
  "kawaii_6886-1" = "KAWAIIVERSE COSMOS",
  "0x1ae6" = "KAWAIIVERSE EVM",
  "0x2b6653dc" = "TRON",
  "0x38" = "BNB",
  "noble-1" = "NOBLE",
  "stargaze-1" = "STARGAZE",
}

export enum ChainNameEnum {
  Oraichain = "Oraichain",
  OraichainTestnet = "Oraichain-testnet",
  KawaiiCosmos = "Kawaiiverse",
  KawaiiEvm = "Kawaiiverse EVM",
  Ethereum = "Ethereum",
  CosmosHub = "Cosmos Hub",
  Osmosis = "Osmosis",
  Juno = "Juno",
  BNBChain = "BNB Chain",
  TRON = "Tron Network",
  BitcoinLegacy = "Bitcoin(Legacy)",
  BitcoinSegWit = "Bitcoin SegWit(BECH32)",
  Injective = "Injective",
  Oasis = "Oasis",
  OasisSapphire = "Oasis Sapphire",
  OasisEmerald = "Oasis Emerald",
  Neutaro = "Neutaro",
  Noble = "Noble",
  Stargaze = "Stargaze",
}

export const restBtc = {
  [ChainIdEnum.Bitcoin]: "https://blockstream.info/api",
  [ChainIdEnum.BitcoinTestnet]: "https://blockstream.info/testnet/api",
};

export const TRC20_LIST = [
  {
    contractAddress: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
    tokenName: "USDC",
    coinDenom: "USDC",
    coinGeckoId: "usd-coin",
    coinImageUrl:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    coinDecimals: 6,
    type: "trc20",
  },
  {
    contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    tokenName: "USDT",
    coinDenom: "USDT",
    coinDecimals: 6,
    coinGeckoId: "tether",
    coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    type: "trc20",
  },
  {
    contractAddress: "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR",
    tokenName: "WTRX",
    coinDenom: "WTRX",
    coinDecimals: 6,
    coinGeckoId: "tron",
    coinImageUrl:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    type: "trc20",
  },
  // {
  //   contractAddress: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
  //   tokenName: 'USDJ',
  //   coinDenom: 'USDJ',
  //   coinDecimals: 6,
  //   coinGeckoId: 'usdj',
  //   coinImageUrl:
  //     'https://s2.coinmarketcap.com/static/img/coins/64x64/5446.png',
  //   type: 'trc20'
  // },
  // {
  //   contractAddress: 'TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3',
  //   tokenName: 'JST',
  //   coinDenom: 'JST',
  //   coinDecimals: 6,
  //   coinGeckoId: 'just',
  //   coinImageUrl:
  //     'https://s2.coinmarketcap.com/static/img/coins/64x64/5488.png',
  //   type: 'trc20'
  // },
  // {
  //   contractAddress: 'TWrZRHY9aKQZcyjpovdH6qeCEyYZrRQDZt',
  //   tokenName: 'SUNOLD',
  //   coinDenom: 'SUNOLD',
  //   coinDecimals: 6,
  //   coinGeckoId: 'sun',
  //   coinImageUrl:
  //     'https://s2.coinmarketcap.com/static/img/coins/64x64/6990.png',
  //   type: 'trc20'
  // }
];
