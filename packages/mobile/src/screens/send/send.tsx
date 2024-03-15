import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { observer } from "mobx-react-lite";
import { useSendTxConfig } from "@owallet/hooks";
import { useStore } from "../../stores";
import { EthereumEndpoint, toAmount } from "@owallet/common";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  AddressInput,
  FeeButtons,
  MemoInput,
  TextInput,
} from "../../components/input";
import { OWButton } from "../../components/button";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTheme } from "@src/themes/theme-provider";
import { metrics, spacing } from "../../themes";
import OWText from "@src/components/text/ow-text";
import OWCard from "@src/components/card/ow-card";
import { PageHeader } from "@src/components/header/header-new";
import OWIcon from "@src/components/ow-icon/ow-icon";
import { NewAmountInput } from "@src/components/input/amount-input";
import { PageWithBottom } from "@src/components/page/page-with-bottom";
import { chainIcons } from "@oraichain/oraidex-common";
import { useSmartNavigation } from "@src/navigation.provider";
import { FeeModal } from "@src/modals/fee";
import { CoinPretty, Int } from "@owallet/unit";

const styling = (colors) =>
  StyleSheet.create({
    sendInputRoot: {
      paddingHorizontal: spacing["20"],
      paddingVertical: spacing["24"],
      backgroundColor: colors["primary"],
      borderRadius: 24,
    },
    sendlabelInput: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 20,
      color: colors["neutral-Text-body"],
    },
    containerStyle: {
      backgroundColor: colors["background-box"],
    },
    bottomBtn: {
      marginTop: 20,
      width: metrics.screenWidth / 2.3,
      borderRadius: 999,
      marginLeft: 12,
    },
  });

export const NewSendScreen: FunctionComponent = observer(() => {
  const {
    chainStore,
    accountStore,
    queriesStore,
    analyticsStore,
    sendStore,
    keyRingStore,
    modalStore,
    priceStore,
  } = useStore();
  const { colors } = useTheme();
  const styles = styling(colors);

  const route = useRoute<
    RouteProp<
      Record<
        string,
        {
          chainId?: string;
          currency?: string;
          recipient?: string;
          contractAddress?: string;
        }
      >,
      string
    >
  >();

  const chainId = route?.params?.chainId
    ? route?.params?.chainId
    : chainStore?.current?.chainId;
  const smartNavigation = useSmartNavigation();

  const account = accountStore.getAccount(chainId);
  const queries = queriesStore.get(chainId);
  const address = account.getAddressDisplay(
    keyRingStore.keyRingLedgerAddresses
  );
  const sendConfigs = useSendTxConfig(
    chainStore,
    chainId,
    account.msgOpts["send"],
    address,
    queries.queryBalances,
    EthereumEndpoint,
    chainStore.current.networkType === "evm" &&
      queriesStore.get(chainStore.current.chainId).evm.queryEvmBalance,

    address
  );

  const [balance, setBalance] = useState("0");
  const [fee, setFee] = useState({});

  const fetchBalance = async () => {
    const queryBalance = queries.queryBalances
      .getQueryBech32Address(account.bech32Address)
      .balances.find((bal) => {
        return (
          bal.currency.coinMinimalDenom ===
          sendConfigs.amountConfig.sendCurrency.coinMinimalDenom //currency.coinMinimalDenom
        );
      });

    if (queryBalance) {
      queryBalance.fetch();
      setBalance(
        queryBalance.balance
          .shrink(true)
          .maxDecimals(6)
          .trim(true)
          .upperCase(true)
          .toString()
      );
    }
  };

  useEffect(() => {
    fetchBalance();
    const averageFee = sendConfigs.feeConfig.getFeeTypePretty("average");
    const averageFeePrice = priceStore.calculatePrice(averageFee);
    setFee({ type: "Avarage", value: averageFeePrice.toString() });
  }, [account.bech32Address, sendConfigs.amountConfig.sendCurrency]);

  useEffect(() => {
    if (route?.params?.currency) {
      const currency = sendConfigs.amountConfig.sendableCurrencies.find(
        (cur) => {
          if (cur?.contractAddress?.includes(route?.params?.contractAddress)) {
            return cur?.contractAddress?.includes(
              route?.params?.contractAddress
            );
          }
          //@ts-ignore

          if (
            cur?.contractAddress?.includes(
              route?.params?.contractAddress?.toLowerCase()
            )
          ) {
            return true;
          }
          if (cur?.coinMinimalDenom) {
            return cur?.coinMinimalDenom.includes(
              route?.params?.contractAddress
            );
          }
          //@ts-ignore

          if (cur?.type === "cw20") {
            return cur.coinDenom == route.params.currency;
          }
          if (cur.coinDenom === route.params.currency) {
            return cur.coinDenom === route.params.currency;
          }
          return cur.coinMinimalDenom == route.params.currency;
        }
      );

      if (currency) {
        sendConfigs.amountConfig.setSendCurrency(currency);
      }
    }
  }, [
    route?.params?.currency,
    sendConfigs.amountConfig,
    route?.params?.contractAddress,
  ]);

  const chainIcon = chainIcons.find(
    (c) => c.chainId === chainStore.current.chainId
  );

  const amount = new CoinPretty(
    sendConfigs.amountConfig.sendCurrency,
    new Int(toAmount(Number(sendConfigs.amountConfig.amount)))
  );

  useEffect(() => {
    if (route?.params?.recipient) {
      sendConfigs.recipientConfig.setRawRecipient(route.params.recipient);
    }
  }, [route?.params?.recipient, sendConfigs.recipientConfig]);

  const sendConfigError =
    sendConfigs.recipientConfig.getError() ??
    sendConfigs.amountConfig.getError() ??
    sendConfigs.memoConfig.getError() ??
    sendConfigs.gasConfig.getError();
  // ?? sendConfigs.feeConfig.getError();
  const txStateIsValid = sendConfigError == null;

  const _onPressFee = () => {
    modalStore.setOptions({
      bottomSheetModalConfig: {
        enablePanDownToClose: false,
        enableOverDrag: false,
      },
    });
    modalStore.setChildren(
      <FeeModal
        vertical={true}
        sendConfigs={sendConfigs}
        colors={colors}
        setFee={setFee}
      />
    );
  };

  return (
    <PageWithBottom
      bottomGroup={
        <OWButton
          label="Send"
          disabled={!account.isReadyToSendMsgs || !txStateIsValid}
          loading={account.isSendingMsg === "delegate"}
          onPress={async () => {
            if (account.isReadyToSendMsgs && txStateIsValid) {
              try {
                if (
                  sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.startsWith(
                    "erc20"
                  )
                ) {
                  sendStore.updateSendObject({
                    type: "erc20",
                    from: account.evmosHexAddress,
                    contract_addr:
                      sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.split(
                        ":"
                      )[1],
                    recipient: sendConfigs.recipientConfig.recipient,
                    amount: sendConfigs.amountConfig.amount,
                  });
                }
                await account.sendToken(
                  sendConfigs.amountConfig.amount,
                  sendConfigs.amountConfig.sendCurrency,
                  sendConfigs.recipientConfig.recipient,
                  sendConfigs.memoConfig.memo,
                  sendConfigs.feeConfig.toStdFee(),
                  {
                    preferNoSetFee: true,
                    preferNoSetMemo: true,
                    networkType: chainStore.current.networkType,
                    chainId: chainStore.current.chainId,
                  },

                  {
                    onFulfill: (tx) => {},
                    onBroadcasted: (txHash) => {
                      analyticsStore.logEvent("Send token tx broadcasted", {
                        chainId: chainStore.current.chainId,
                        chainName: chainStore.current.chainName,
                        feeType: sendConfigs.feeConfig.feeType,
                      });
                      smartNavigation.pushSmart("TxPendingResult", {
                        txHash: Buffer.from(txHash).toString("hex"),
                      });
                    },
                  },
                  // In case send erc20 in evm network
                  sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.startsWith(
                    "erc20"
                  )
                    ? {
                        type: "erc20",
                        from: account.evmosHexAddress,
                        contract_addr:
                          sendConfigs.amountConfig.sendCurrency.coinMinimalDenom.split(
                            ":"
                          )[1],
                        recipient: sendConfigs.recipientConfig.recipient,
                        amount: sendConfigs.amountConfig.amount,
                      }
                    : null
                );
              } catch (e) {
                if (e?.message === "Request rejected") {
                  return;
                }

                // if (
                //   e?.message?.includes('Cannot read properties of undefined')
                // ) {
                //   return;
                // }

                // alert(e.message);
                if (smartNavigation.canGoBack) {
                  smartNavigation.goBack();
                } else {
                  smartNavigation.navigateSmart("Home", {});
                }
              }
            }
          }}
          style={[
            styles.bottomBtn,
            {
              width: metrics.screenWidth - 32,
            },
          ]}
          textStyle={{
            fontSize: 14,
            fontWeight: "600",
          }}
        />
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageHeader
          title="Send"
          subtitle={"Oraichain"}
          colors={colors}
          onPress={async () => {}}
        />
        <View>
          <OWCard type="normal">
            <OWText color={colors["neutral-text-title"]} size={12}>
              Recipient
            </OWText>

            <AddressInput
              colors={colors}
              placeholder="Enter address"
              label=""
              recipientConfig={sendConfigs.recipientConfig}
              memoConfig={sendConfigs.memoConfig}
              labelStyle={styles.sendlabelInput}
              containerStyle={{
                marginBottom: 12,
              }}
              inputContainerStyle={{
                backgroundColor: colors["neutral-surface-card"],
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
            />
          </OWCard>
          <OWCard style={{ paddingTop: 22 }} type="normal">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{}}>
                <OWText style={{ paddingTop: 8 }} size={12}>
                  Balance : {balance}
                </OWText>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: colors["neutral-surface-action3"],
                    borderRadius: 999,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    maxWidth: metrics.screenWidth / 4.5,
                    marginTop: 12,
                  }}
                >
                  <OWIcon
                    type="images"
                    source={{ uri: chainIcon?.Icon }}
                    size={16}
                  />
                  <OWText style={{ paddingLeft: 4 }} weight="600" size={14}>
                    {sendConfigs.amountConfig.sendCurrency.coinDenom}
                  </OWText>
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <NewAmountInput
                  colors={colors}
                  inputContainerStyle={{
                    borderWidth: 0,
                    width: metrics.screenWidth / 2,
                  }}
                  amountConfig={sendConfigs.amountConfig}
                  placeholder={"0.0"}
                  maxBalance={balance.split(" ")[0]}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <OWIcon name="tdesign_swap" size={16} />
              <OWText
                style={{ paddingLeft: 4 }}
                color={colors["neutral-text-body"]}
                size={14}
              >
                {priceStore.calculatePrice(amount).toString()}
              </OWText>
            </View>
          </OWCard>
          <OWCard type="normal">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: colors["neutral-border-default"],
                borderBottomWidth: 1,
                paddingVertical: 16,
                marginBottom: 8,
              }}
            >
              <OWText color={colors["neutral-text-title"]} weight="600">
                Transaction fee
              </OWText>
              <TouchableOpacity onPress={_onPressFee}>
                <OWText color={colors["primary-text-action"]} weight="600">
                  {fee.type}: {fee.value}
                </OWText>
              </TouchableOpacity>
            </View>

            <OWText color={colors["neutral-text-title"]} size={12}>
              Memo
            </OWText>

            <MemoInput
              label=""
              placeholder="Required if send to CEX"
              inputContainerStyle={{
                backgroundColor: colors["neutral-surface-card"],
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
              memoConfig={sendConfigs.memoConfig}
              labelStyle={styles.sendlabelInput}
            />
          </OWCard>
        </View>
      </ScrollView>
    </PageWithBottom>
  );
});
