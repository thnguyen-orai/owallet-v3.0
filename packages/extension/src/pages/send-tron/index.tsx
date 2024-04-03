import React, { FunctionComponent, useEffect } from "react";
import { AddressInput, CoinInput } from "../../components/form";
import { useStore } from "../../stores";
import { observer } from "mobx-react-lite";

import style from "../send-evm/style.module.scss";
import { useNotification } from "../../components/notification";

import { useIntl } from "react-intl";
import { Button } from "reactstrap";

import { useHistory, useLocation } from "react-router";
import queryString from "querystring";
import { InvalidTronAddressError, useGetFeeTron } from "@owallet/hooks";
import { fitPopupWindow } from "@owallet/popup";
import { decodeParams, EthereumEndpoint } from "@owallet/common";
import { FeeInput } from "../../components/form/fee-input";
import { useSendTxTronConfig } from "@owallet/hooks/build/tx/send-tx-tron";
import TronWeb from "tronweb";
export const SendTronEvmPage: FunctionComponent<{
  coinMinimalDenom?: string;
  tokensTrc20Tron?: Array<any>;
}> = observer(({ coinMinimalDenom, tokensTrc20Tron }) => {
  const history = useHistory();
  let search = useLocation().search || coinMinimalDenom || "";
  if (search.startsWith("?")) {
    search = search.slice(1);
  }
  const query = queryString.parse(search) as {
    defaultDenom: string | undefined;
    defaultRecipient: string | undefined;
    defaultAmount: string | undefined;
    defaultMemo: string | undefined;
    detached: string | undefined;
  };

  useEffect(() => {
    // Scroll to top on page mounted.
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, []);

  const intl = useIntl();
  const inputRef = React.useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [coinMinimalDenom]);

  const notification = useNotification();

  const { chainStore, priceStore, accountStore, queriesStore, keyRingStore } =
    useStore();
  const current = chainStore.current;

  const accountInfo = accountStore.getAccount(current.chainId);

  const sendConfigs = useSendTxTronConfig(
    chainStore,
    current.chainId,
    //@ts-ignore
    accountInfo.msgOpts.send,
    accountInfo.evmosHexAddress,
    queriesStore.get(current.chainId).queryBalances,
    EthereumEndpoint
  );

  useEffect(() => {
    if (query.defaultDenom) {
      const currency = current.currencies.find(
        (cur) => cur.coinMinimalDenom === query.defaultDenom
      );

      if (currency) {
        sendConfigs.amountConfig.setSendCurrency(currency);
      }
    }
  }, [current.currencies, query.defaultDenom, sendConfigs.amountConfig]);

  const isDetachedPage = query.detached === "true";

  useEffect(() => {
    (async () => {
      try {
        const decode = await decodeParams(
          ["address", "string", "uint256"],
          "0f212357000000000000000000000000a614f803b6fd780986a42c78ec9c7f77e6ded13c00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000293449000000000000000000000000000000000000000000000000000000000000007a6368616e6e656c2d312f6f72616931327a797538773933683071326c636e7435306733666e30773379716e6879346676617761717a3a43697476636d46704d544a3665585534647a6b7a614442784d6d786a626e51314d47637a5a6d3477647a4e356357356f6554526d646d4633595846364567416141413d3d000000000000",
          true
        );
        console.log(decode, "decodedecode");
        const tronWeb = new TronWeb({
          fullHost: "https://api.trongrid.io",
        });
        const res = await tronWeb.transactionBuilder.triggerConstantContract(
          "TLXrPtQor6xxF2HeQtmKJUUkVNjJZVsgTM",
          "sendToCosmos(address,string,uint256)",
          {},
          [
            {
              type: "address",
              value: "41a614f803b6fd780986a42c78ec9c7f77e6ded13c",
            },
            {
              type: "string",
              value:
                "channel-1/orai12zyu8w93h0q2lcnt50g3fn0w3yqnhy4fvawaqz:CitvcmFpMTJ6eXU4dzkzaDBxMmxjbnQ1MGczZm4wdzN5cW5oeTRmdmF3YXF6EgAaAA==",
            },
            { type: "uint256", value: 2700361n },
          ],
          "TE15PBm8MsyS4cHrW7u1VTjbZDx5MXVQfs"
        );
        console.log(res, "triggerConstantContract");
      } catch (e) {
        console.log(e, "triggerConstantContract");
      }
    })();
  }, []);
  useEffect(() => {
    if (isDetachedPage) {
      fitPopupWindow();
    }
  }, [isDetachedPage]);

  useEffect(() => {
    if (query.defaultRecipient) {
      sendConfigs.recipientConfig.setRawRecipient(query.defaultRecipient);
    }
    if (query.defaultAmount) {
      sendConfigs.amountConfig.setAmount(query.defaultAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.defaultAmount, query.defaultRecipient]);
  const addressTronBase58 = accountInfo.getAddressDisplay(
    keyRingStore.keyRingLedgerAddresses
  );
  const checkSendMySelft =
    sendConfigs.recipientConfig.recipient?.trim() === addressTronBase58
      ? new InvalidTronAddressError("Cannot transfer TRX to the same account")
      : null;
  const sendConfigError =
    checkSendMySelft ??
    sendConfigs.recipientConfig.getError() ??
    sendConfigs.amountConfig.getError() ??
    sendConfigs.feeConfig.getError();
  const txStateIsValid = sendConfigError == null;
  const addressTron = accountInfo.getAddressDisplay(
    keyRingStore.keyRingLedgerAddresses,
    false
  );

  const tokenTrc20 =
    (tokensTrc20Tron &&
      query &&
      tokensTrc20Tron.find((token) => token.coinDenom == query.defaultDenom)) ??
    undefined;
  const onSend = async (e: any) => {
    e.preventDefault();
    try {
      await accountInfo.sendTronToken(
        sendConfigs.amountConfig.amount,
        sendConfigs.amountConfig.sendCurrency!,
        sendConfigs.recipientConfig.recipient,
        addressTron,
        {
          onFulfill: (tx) => {
            notification.push({
              placement: "top-center",
              type: !!tx ? "success" : "danger",
              duration: 5,
              content: !!tx ? `Transaction successful` : `Transaction failed`,
              canDelete: true,
              transition: {
                duration: 0.25,
              },
            });
          },
        },
        tokenTrc20
      );
      if (!isDetachedPage) {
        history.replace("/");
      }
    } catch (error) {
      if (!isDetachedPage) {
        history.replace("/");
      }
      notification.push({
        type: "warning",
        placement: "top-center",
        duration: 5,
        content: `Fail to send token: ${error.message}`,
        canDelete: true,
        transition: {
          duration: 0.25,
        },
      });
    } finally {
      if (isDetachedPage) {
        window.close();
      }
    }
  };
  const queries = queriesStore.get(current.chainId);
  const { feeTrx } = useGetFeeTron(
    addressTronBase58,
    sendConfigs.amountConfig,
    sendConfigs.recipientConfig,
    queries.tron,
    chainStore.current,
    keyRingStore
  );
  useEffect(() => {
    sendConfigs.feeConfig.setManualFee(feeTrx);
    return () => {
      sendConfigs.feeConfig.setManualFee(null);
    };
  }, [feeTrx]);
  return (
    <>
      <form className={style.formContainer} onSubmit={onSend}>
        <div className={style.formInnerContainer}>
          <div>
            <AddressInput
              inputRef={inputRef}
              recipientConfig={sendConfigs.recipientConfig}
              memoConfig={sendConfigs.memoConfig}
              label={intl.formatMessage({ id: "send.input.recipient" })}
              placeholder="Enter recipient address"
            />
            <CoinInput
              amountConfig={sendConfigs.amountConfig}
              label={intl.formatMessage({ id: "send.input.amount" })}
              balanceText={intl.formatMessage({
                id: "send.input-button.balance",
              })}
              placeholder="Enter your amount"
            />
            {/*<p>Estimate Bandwidth: {`${bandwidthUsed}`}</p>*/}
            {/*<p>Estimate Energy: {`${energyUsed}`}</p>*/}
            <FeeInput
              label={"Fee"}
              defaultValue={1}
              //@ts-ignore
              feeConfig={sendConfigs.feeConfig}
            />
          </div>
          <div style={{ flex: 1 }} />
          <Button
            type="submit"
            block
            data-loading={accountInfo.isSendingMsg === "send"}
            disabled={!accountInfo.isReadyToSendMsgs || !txStateIsValid}
            className={style.sendBtn}
            style={{
              cursor:
                accountInfo.isReadyToSendMsgs || !txStateIsValid
                  ? ""
                  : "pointer",
            }}
          >
            <span className={style.sendBtnText}>
              {intl.formatMessage({
                id: "send.button.send",
              })}
            </span>
          </Button>
        </div>
      </form>
    </>
  );
});
