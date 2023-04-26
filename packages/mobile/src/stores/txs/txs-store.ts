import { observable, action, makeObservable, computed } from 'mobx';
import { Txs } from './abstract/txs';
import { TxsEVM } from './ethereum/txs-evm';
import { TxsCosmos } from './cosmos/txs-cosmos';
import { ChainInfoInner } from '@owallet/stores';
import { ChainInfo } from '@owallet/types';
import { NetworkEnum } from './helpers/txs-enums';
export class TxsStore extends Txs {
  @observable
  public readonly txsEvm: TxsEVM;
  public readonly txsCosmos: TxsCosmos;
  constructor(current_chain: ChainInfoInner<ChainInfo>) {
    super(current_chain);
    makeObservable(this);
    this.txsEvm = new TxsEVM(current_chain);
    this.txsCosmos = new TxsCosmos(current_chain);
  }
  //   @action
  //   updateSendObject(sendObj) {
  //     this.txs = this.accountStore.getAccount(this.chainStore.current.chainId);
  //   }
  async getTxs(
    page: number,
    current_page: number,
    params: ParamsFilterReqTxs
  ): Promise<Partial<ResTxs>> {
    try {
      if (this.networkType === NetworkEnum.Cosmos) {
        return await this.txsCosmos.getTxs(page, current_page, params);
      } else if (this.networkType === NetworkEnum.Evm) {
        return await this.txsEvm.getTxs(page, current_page, params);
      }
      return;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async getTxsByHash(txHash: string, addressAccount?: string): Promise<Partial<ResTxsInfo>> {
    try {
      if (this.networkType === NetworkEnum.Cosmos) {
        return await this.txsCosmos.getTxsByHash(txHash,addressAccount);
      } else if (this.networkType === NetworkEnum.Evm) {
        return this.txsEvm.getTxsByHash(txHash);
      }
      return;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // @computed
  // get sendObj() {
  //   return this.txs;
  // }
}
