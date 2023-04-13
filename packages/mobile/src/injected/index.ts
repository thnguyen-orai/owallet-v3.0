import {
  RNInjectedOWallet,
  RNInjectedEthereum,
  RNInjectedTronWeb
} from './injected-provider';
import { init } from './init';

// TODO: Set the OWallet version properly
const owallet = new RNInjectedOWallet('0.9.21', 'mobile-web');
const ethereum = new RNInjectedEthereum('0.9.21', 'mobile-web');
const tronWeb = new RNInjectedTronWeb('0.9.21', 'mobile-web');

init(
  owallet,
  ethereum,
  tronWeb,
  (chainId: string) => owallet.getOfflineSigner(chainId),
  (chainId: string) => owallet.getEnigmaUtils(chainId)
);
