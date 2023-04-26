import { ChainInfoInner } from '@owallet/stores';
import { Txs } from '../abstract/txs';
import { ChainInfo } from '@owallet/types';
import { API } from '@src/common/api';

export class TxsCosmos extends Txs {
  constructor(current_chain: ChainInfoInner<ChainInfo>) {
    super(current_chain);
  }
  async getTxsByToken(
    page: number,
    current_page: number,
    params: ParamsFilterReqTxs
  ): Promise<Partial<ResTxs>> {
    const query = `message.sender='${params?.addressAccount}'${
      this.currentChain.chainId == 'osmosis-1'
        ? ''
        : ` AND transfer.amount CONTAINS '${params?.token}'`
    }`;
    const data = await API.getTxsRpcCosmos(
      this.currentChain.rpc,
      query,
      page,
      current_page
    );
    const rsConverted = this.txsHelper.cleanDataRpcCosmosToStandFormat(
      data.txs,
      this.currentChain,
      params?.addressAccount
    );
    return Promise.resolve({
      result: rsConverted,
      current_page,
      total_page: Math.ceil(parseInt(data?.total_count) / page) || 1
    });
  }
  async getTxs(
    page: number,
    current_page: number,
    params: ParamsFilterReqTxs
  ): Promise<Partial<ResTxs>> {
    try {
      if (params?.token) {
        return this.getTxsByToken(page, current_page, params);
      }
      const query = [
        `message.sender='${params?.addressAccount}'`,
        params?.action !== 'All' ? `message.action='${params?.action}'` : ''
      ];
      const data = await API.getTxsLcdCosmos(
        this.currentChain.rest,
        this.txsHelper.removeEmptyElements(query),
        page,
        current_page * 10
      );

      const rsConverted = this.txsHelper.cleanDataCosmosToStandFormat(
        data.tx_responses,
        this.currentChain,
        params?.addressAccount
      );
      return Promise.resolve({
        result: rsConverted,
        current_page,
        total_page: Math.ceil(parseInt(data?.pagination?.total) / page) || 1
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTxsByHash(
    txHash: string,
    addressAccount?: string
  ): Promise<Partial<ResTxsInfo>> {
    try {
      const txs = await API.getTxsByLCD({
        method: `/txs/${txHash}`,
        url: this.currentChain.rest
      });
      return this.txsHelper.handleItemCosmos(
        txs,
        this.currentChain,
        addressAccount
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
