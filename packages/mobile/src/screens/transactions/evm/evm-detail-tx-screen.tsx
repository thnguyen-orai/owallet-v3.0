import React, { FunctionComponent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTheme } from "@src/themes/theme-provider";
import { StyleSheet, View, Image, RefreshControl } from "react-native";
import OWText from "@src/components/text/ow-text";
import { useStore } from "@src/stores";
import { OWButton } from "@src/components/button";
import { metrics } from "@src/themes";
import { ScrollView } from "react-native-gesture-handler";
import { API } from "@src/common/api";
import {
  capitalizedText,
  formatContractAddress,
  maskedNumber,
  openLink,
  shortenAddress,
} from "@src/utils/helper";
import moment from "moment";
import { PageWithBottom } from "@src/components/page/page-with-bottom";
import { HeaderTx } from "@src/screens/tx-result/components/header-tx";
import ItemReceivedToken from "@src/screens/transactions/components/item-received-token";
import { Text } from "@src/components/text";
import OWButtonIcon from "@src/components/button/ow-button-icon";
import { MapNetworkToChainId, unknownToken } from "@owallet/common";
import { Network } from "@tatumio/tatum";
import { CoinPretty, Dec, DecUtils, Int } from "@owallet/unit";
import { OwLoading } from "@src/components/owallet-loading/ow-loading";

import { Currency } from "@owallet/types";

import { getTimeMilliSeconds, urlTxHistory } from "@src/common/constants";
import { OWEmpty } from "@src/components/empty";
import { AllNetworkItemTx } from "@owallet/types";

export const EvmDetailTx: FunctionComponent = observer((props) => {
  const { chainStore, priceStore } = useStore();

  const route = useRoute<
    RouteProp<
      Record<
        string,
        {
          item: AllNetworkItemTx;
          currency: Currency;
        }
      >,
      string
    >
  >();
  const [detail, setDetail] = useState<TxDetail>();
  const [loading, setLoading] = useState(false);

  const { item, currency } = route.params;
  const { txhash: hash, network: chain } = item;

  const getHistoryDetail = async () => {
    try {
      setLoading(true);
      const res = await API.getDetailAllTx(
        {
          hash,
          network: chain as Network,
        },
        {
          baseURL: urlTxHistory,
        }
      );
      if (res && res.status !== 200) throw Error("Failed");
      setDetail(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("getHistoryDetail err", err);
    }
  };

  useEffect(() => {
    getHistoryDetail();
  }, [hash]);
  const { colors } = useTheme();

  const styles = useStyles(colors);
  const isSent =
    item.userAddress?.toLowerCase() === item.fromAddress?.toLowerCase() ||
    item.fromAddress?.toLowerCase() === item.toAddress?.toLowerCase();
  if (loading) return <OwLoading />;
  if (!detail) return <OWEmpty />;
  const chainInfo = chainStore.getChain(MapNetworkToChainId[item.network]);
  const handleUrl = (txHash) => {
    // const chainInfo = chainStore.getChain(detail.chainId);
    return chainInfo.raw.txExplorer.txUrl.replace(
      "{txHash}",
      txHash.toLowerCase()
    );
  };
  const handleOnExplorer = async () => {
    if (chainInfo.raw.txExplorer && detail.hash) {
      const url = handleUrl(detail.hash);
      await openLink(url);
    }
  };

  const fee = new CoinPretty(
    chainInfo.stakeCurrency,
    new Int(Number(detail.gasPrice)).mul(new Int(detail.gasUsed))
  );
  const amountRaw = item?.amount?.[0] || 0;
  const amount = new CoinPretty(currency, new Dec(amountRaw));

  const onRefresh = () => {
    getHistoryDetail();
  };
  return (
    <PageWithBottom
      style={{
        paddingTop: 0,
      }}
      backgroundColor={colors["neutral-surface-bg"]}
      bottomGroup={
        <View style={styles.containerBottomButton}>
          <OWButton
            style={styles.btnApprove}
            label={"View on Explorer"}
            onPress={handleOnExplorer}
          />
        </View>
      }
    >
      <View style={styles.containerBox}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <HeaderTx
            type={!isSent ? "Received" : "Sent"}
            colorAmount={
              new Dec(amountRaw).gt(new Dec(0))
                ? colors["success-text-body"]
                : colors["error-text-body"]
            }
            imageType={
              <View
                style={[
                  styles.containerSuccess,
                  {
                    backgroundColor: detail.status
                      ? colors["highlight-surface-subtle"]
                      : colors["error-surface-subtle"],
                  },
                ]}
              >
                <OWText
                  weight={"500"}
                  size={14}
                  color={
                    detail.status
                      ? colors["highlight-text-title"]
                      : colors["error-text-body"]
                  }
                >
                  {detail.status ? "Success" : "Failed"}
                </OWText>
              </View>
            }
            amount={`${
              new Dec(amountRaw).gt(new Dec(0)) ? "+" : ""
            }${maskedNumber(amount.hideDenom(true)?.toString())} ${
              currency.coinDenom
            }`}
            toAmount={null}
            price={priceStore
              .calculatePrice(amount)
              ?.toString()
              ?.replace("-", "")}
          />
          <View style={styles.cardBody}>
            <ItemReceivedToken
              label={capitalizedText("From")}
              valueDisplay={shortenAddress(item.fromAddress)}
              value={detail.from}
              colorIconRight={colors["neutral-text-action-on-light-bg"]}
            />
            <ItemReceivedToken
              label={capitalizedText("To")}
              valueDisplay={shortenAddress(item.toAddress)}
              value={detail.to}
              colorIconRight={colors["neutral-text-action-on-light-bg"]}
            />
            <ItemReceivedToken
              label={"From Network"}
              valueDisplay={
                <View style={styles.viewNetwork}>
                  <Image
                    style={styles.imgNetwork}
                    source={{
                      uri:
                        chainInfo?.stakeCurrency?.coinImageUrl ||
                        unknownToken.coinImageUrl,
                    }}
                  />
                  <Text
                    size={16}
                    color={colors["neutral-text-body"]}
                    weight={"400"}
                    style={{
                      paddingLeft: 3,
                    }}
                  >
                    {chainInfo?.chainName}
                  </Text>
                </View>
              }
              btnCopy={false}
            />

            <ItemReceivedToken
              label={"Fee"}
              valueDisplay={`${fee
                .trim(true)
                .maxDecimals(6)
                ?.toString()} (${priceStore.calculatePrice(fee)?.toString()})`}
              btnCopy={false}
            />
            <ItemReceivedToken
              label={"Time"}
              valueDisplay={moment(getTimeMilliSeconds(item.timestamp)).format(
                "MMM D, YYYY [at] HH:mm"
              )}
              btnCopy={false}
            />

            <ItemReceivedToken
              label={"Hash"}
              valueDisplay={formatContractAddress(detail.hash)}
              value={detail.hash}
              btnCopy={false}
              IconRightComponent={
                <View>
                  <OWButtonIcon
                    name="tdesignjump"
                    sizeIcon={20}
                    fullWidth={false}
                    onPress={handleOnExplorer}
                    colorIcon={colors["neutral-text-action-on-light-bg"]}
                  />
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>
    </PageWithBottom>
  );
});

const useStyles = (colors) => {
  return StyleSheet.create({
    padIcon: {
      width: 22,
      height: 22,
    },
    wrapper: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 160,
    },
    wrapperDetail: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: colors["neutral-border-default"],
      borderBottomWidth: 1,
      paddingVertical: 8,
    },
    container: {
      paddingTop: metrics.screenHeight / 14,
      height: "100%",
      backgroundColor: colors["neutral-surface-bg2"],
    },
    signIn: {
      width: "100%",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors["neutral-border-default"],
      padding: 16,
      position: "absolute",
      bottom: 30,
      paddingVertical: 12,
      backgroundColor: colors["neutral-surface-card"],
    },
    aic: {
      alignItems: "center",
      paddingBottom: 20,
    },
    rc: {
      flexDirection: "row",
      alignItems: "center",
    },
    goBack: {
      backgroundColor: colors["neutral-surface-card"],
      borderRadius: 999,
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      paddingHorizontal: 16,
      paddingTop: 24,
    },
    input: {
      width: metrics.screenWidth - 32,
      borderColor: colors["neutral-border-strong"],
    },
    textInput: { fontWeight: "600", paddingLeft: 4, fontSize: 15 },
    txDetail: {
      backgroundColor: colors["neutral-surface-card"],
      width: metrics.screenWidth - 32,
      borderRadius: 24,
      marginTop: 1,
      padding: 16,
    },
    status: {
      backgroundColor: colors["highlight-surface-subtle"],
      paddingHorizontal: 12,
      paddingVertical: 2,
      borderRadius: 12,
      marginBottom: 10,
    },
    headerCard: {
      backgroundColor: colors["neutral-surface-card"],
      width: metrics.screenWidth - 32,
      borderRadius: 24,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      overflow: "hidden",
    },
    containerSuccess: {
      width: "100%",
      paddingHorizontal: 12,
      paddingVertical: 2,
      borderRadius: 99,
      alignSelf: "center",
    },
    containerBottomButton: {
      width: "100%",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    btnApprove: {
      borderRadius: 99,
      backgroundColor: colors["primary-surface-default"],
    },
    cardBody: {
      padding: 16,
      borderRadius: 24,
      marginHorizontal: 16,
      backgroundColor: colors["neutral-surface-card"],
    },
    viewNetwork: {
      flexDirection: "row",
      paddingTop: 6,
    },
    imgNetwork: {
      height: 20,
      width: 20,
    },
    containerBox: {
      flex: 1,
    },
  });
};

export interface TxDetail {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: number;
  gasPrice: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  value: string;
  type: string;
  chainId: string;
  contractAddress: any;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  gasUsed: string;
  logs: any[];
  logsBloom: string;
  status: boolean;
  transactionHash: string;
  hash: string;
}
