import React, { FunctionComponent, useEffect, useState } from "react";
import {
  AddressInput,
  FeeButtons,
  CoinInput,
  MemoInput,
} from "../../components/form";
import { useStore } from "../../stores";

import { observer } from "mobx-react-lite";

import style from "./style.module.scss";
import { useNotification } from "../../components/notification";

import { useIntl } from "react-intl";
import { Button } from "reactstrap";

import { useHistory, useLocation } from "react-router";
import queryString from "querystring";

import { useSendTxEvmConfig } from "@owallet/hooks";
import { fitPopupWindow } from "@owallet/popup";
import {
  ChainIdEnum,
  EthereumEndpoint,
  OasisTransaction,
  getOasisNic,
  parseRoseStringToBigNumber,
  signerFromPrivateKey,
} from "@owallet/common";
import { Signer } from "@oasisprotocol/client/dist/signature";
export const SendEvmPage: FunctionComponent<{
  coinMinimalDenom?: string;
}> = observer(({ coinMinimalDenom }) => {
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
  const inputRef = React.useRef(null);
  useEffect(() => {
    // Scroll to top on page mounted.
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [coinMinimalDenom]);
  const intl = useIntl();

  const notification = useNotification();

  const {
    chainStore,
    accountStore,
    priceStore,
    queriesStore,
    analyticsStore,
    keyRingStore,
  } = useStore();
  const current = chainStore.current;
  const accountInfo = accountStore.getAccount(current.chainId);
  const walletAddress = accountInfo.getAddressDisplay(
    keyRingStore.keyRingLedgerAddresses,
    false
  );

  const sendConfigs = useSendTxEvmConfig(
    chainStore,
    current.chainId,
    //@ts-ignore
    accountInfo.msgOpts.send,
    walletAddress,
    queriesStore.get(current.chainId).queryBalances,
    queriesStore.get(current.chainId),
    EthereumEndpoint
  );

  const { gas: gasErc20 } = queriesStore
    .get(current.chainId)
    .evmContract.queryGas.getGas({
      to: sendConfigs.recipientConfig.recipient,
      from: walletAddress,
      contract_address:
        sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.split(":")[1],
      amount: sendConfigs.amountConfig.amount,
    });
  const { gas: gasNative } = queriesStore
    .get(current.chainId)
    .evm.queryGas.getGas({
      to: sendConfigs.recipientConfig.recipient,
      from: walletAddress,
    });
  const { gasPrice } = queriesStore
    .get(current.chainId)
    .evm.queryGasPrice.getGasPrice();
  useEffect(() => {
    if (!gasPrice) return;
    sendConfigs.gasConfig.setGasPriceStep(gasPrice);
    if (
      sendConfigs.amountConfig?.sendCurrency?.coinMinimalDenom?.startsWith(
        "erc20"
      )
    ) {
      if (!gasErc20) return;
      sendConfigs.gasConfig.setGas(gasErc20);
      return;
    }
    if (!gasNative) return;

    sendConfigs.gasConfig.setGas(gasNative);
    return () => {};
  }, [gasNative, gasPrice, gasErc20, sendConfigs.amountConfig?.sendCurrency]);

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
    if (query.defaultMemo) {
      sendConfigs.memoConfig.setMemo(query.defaultMemo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.defaultAmount, query.defaultMemo, query.defaultRecipient]);

  const sendConfigError =
    sendConfigs.recipientConfig.getError() ??
    sendConfigs.amountConfig.getError() ??
    // sendConfigs.memoConfig.getError() ??
    sendConfigs.gasConfig.getError() ??
    sendConfigs.feeConfig.getError();
  const txStateIsValid = sendConfigError == null;
  const submitSignOasis = async (tx) => {
    const { bytes, amount, to } = tx;
    const signer = signerFromPrivateKey(bytes);

    const bigIntAmount = BigInt(parseRoseStringToBigNumber(amount).toString());
    const nic = getOasisNic(chainStore.current.raw.grpc);
    const chainContext = await nic.consensusGetChainContext();

    const tw = await OasisTransaction.buildTransfer(
      nic,
      signer as Signer,
      to,
      bigIntAmount
    );

    await OasisTransaction.sign(chainContext, signer as Signer, tw);

    await OasisTransaction.submit(nic, tw);

    notification.push({
      placement: "top-center",
      type: "success",
      duration: 5,
      content: "Transaction successful",
      canDelete: true,
      transition: {
        duration: 0.25,
      },
    });
  };
  const onSend = async (e: any) => {
    e.preventDefault();
    if (accountInfo.isReadyToSendMsgs && txStateIsValid) {
      try {
        const stdFee = sendConfigs.feeConfig.toStdEvmFee();
        console.log("🚀 ~ onSubmit={ ~ stdFee:", stdFee);
        // (window as any).accountInfo = accountInfo;
        await accountInfo.sendToken(
          sendConfigs.amountConfig.amount,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          sendConfigs.amountConfig.sendCurrency!,
          sendConfigs.recipientConfig.recipient,
          sendConfigs.memoConfig.memo,
          stdFee,
          {
            preferNoSetFee: true,
            preferNoSetMemo: true,
            networkType: chainStore.current.networkType,
            chainId: chainStore.current.chainId,
          },
          {
            onBroadcasted: () => {
              analyticsStore.logEvent("Send token tx broadcasted", {
                chainId: chainStore.current.chainId,
                chainName: chainStore.current.chainName,
                feeType: sendConfigs.feeConfig.feeType,
              });
            },
            onFulfill: (tx) => {
              if (tx && chainStore.current.chainId === ChainIdEnum.Oasis) {
                submitSignOasis(tx);
                return;
              }
              if (!tx?.status) return;
              notification.push({
                placement: "top-center",
                type: tx?.data ? "success" : "danger",
                duration: 5,
                content: tx?.data
                  ? `Transaction successful with tx: ${tx?.hash}`
                  : `Transaction failed with tx: ${tx?.hash}`,
                canDelete: true,
                transition: {
                  duration: 0.25,
                },
              });
            },
          },
          sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.startsWith(
            "erc20"
          )
            ? {
                type: "erc20",
                from: walletAddress,
                contract_addr:
                  sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.split(
                    ":"
                  )[1],
                recipient: sendConfigs.recipientConfig.recipient,
                amount: sendConfigs.amountConfig.amount,
              }
            : null
        );
        if (!isDetachedPage) {
          history.replace("/");
        }
        notification.push({
          placement: "top-center",
          type: "success",
          duration: 5,
          content: "Transaction submitted!",
          canDelete: true,
          transition: {
            duration: 0.25,
          },
        });
      } catch (e: any) {
        if (!isDetachedPage) {
          history.replace("/");
        }
        console.log(e.message, "Catch Error on send!!!");
        notification.push({
          type: "warning",
          placement: "top-center",
          duration: 5,
          content: `Fail to send token: ${e.message}`,
          canDelete: true,
          transition: {
            duration: 0.25,
          },
        });
      } finally {
        // XXX: If the page is in detached state,
        // close the window without waiting for tx to commit. analytics won't work.
        if (isDetachedPage) {
          window.close();
        }
      }
    }
  };
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
            {/* <MemoInput
              memoConfig={sendConfigs.memoConfig}
              label={intl.formatMessage({ id: 'send.input.memo' })}
              placeholder="Enter your memo message"
            /> */}
            <FeeButtons
              feeConfig={sendConfigs.feeConfig}
              gasConfig={sendConfigs.gasConfig}
              //   customFee={true}
              priceStore={priceStore}
              label={intl.formatMessage({ id: "send.input.fee" })}
              feeSelectLabels={{
                low: intl.formatMessage({ id: "fee-buttons.select.slow" }),
                average: intl.formatMessage({
                  id: "fee-buttons.select.average",
                }),
                high: intl.formatMessage({ id: "fee-buttons.select.fast" }),
              }}
              gasLabel={intl.formatMessage({ id: "send.input.gas" })}
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
