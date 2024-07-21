import React, { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { metrics, spacing, typography } from "../../../themes";
import { _keyExtract, showToast } from "../../../utils/helper";
import { Text } from "@src/components/text";
import {
  COINTYPE_NETWORK,
  getKeyDerivationFromAddressType,
} from "@owallet/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useBIP44Option } from "@src/screens/register/bip44";
import { useStore } from "@src/stores";
import { useTheme } from "@src/themes/theme-provider";
import { Popup } from "react-native-popup-confirm-toast";
import OWIcon from "@src/components/ow-icon/ow-icon";
import { OWButton } from "@src/components/button";
import { RadioButton } from "react-native-radio-buttons-group";
import { ChainInfoWithEmbed } from "@owallet/background";
import { ChainInfoInner } from "@owallet/stores";
import { initPrice } from "@src/screens/home/hooks/use-multiple-assets";
import { PricePretty } from "@owallet/unit";
import ByteBrew from "react-native-bytebrew-sdk";

interface ChainInfoItem extends ChainInfoInner<ChainInfoWithEmbed> {
  balance: PricePretty;
}
export const NetworkModal: FC<{
  hideAllNetwork?: boolean;
}> = ({ hideAllNetwork }) => {
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"mainnet" | "testnet">("mainnet");
  useEffect(() => {
    ByteBrew.NewCustomEvent("Modal Select Network Screen");
  }, []);
  const bip44Option = useBIP44Option();
  const {
    modalStore,
    chainStore,
    keyRingStore,
    accountStore,
    appInitStore,
    universalSwapStore,
    priceStore,
  } = useStore();

  const account = accountStore.getAccount(chainStore.current.chainId);
  const styles = styling(colors);

  const onConfirm = async (item: any) => {
    const { networkType } = chainStore.getChain(item?.chainId);
    const keyDerivation = (() => {
      const keyMain = getKeyDerivationFromAddressType(account.addressType);
      if (networkType === "bitcoin") {
        return keyMain;
      }
      return "44";
    })();
    chainStore.selectChain(item?.chainId);
    await chainStore.saveLastViewChainId();
    appInitStore.selectAllNetworks(false);
    modalStore.close();
    Popup.hide();

    await keyRingStore.setKeyStoreLedgerAddress(
      `${keyDerivation}'/${item.bip44.coinType ?? item.coinType}'/${
        bip44Option.bip44HDPath.account
      }'/${bip44Option.bip44HDPath.change}/${
        bip44Option.bip44HDPath.addressIndex
      }`,
      item?.chainId
    );
  };

  useEffect(() => {
    if (chainStore.current.chainName.toLowerCase().includes("test")) {
      setActiveTab("testnet");
    }
  }, [chainStore.current.chainName]);

  const handleSwitchNetwork = useCallback(async (item) => {
    try {
      if (account.isNanoLedger) {
        modalStore.close();
        if (!item.isAll) {
          Popup.show({
            type: "confirm",
            title: "Switch network!",
            textBody: `You are switching to ${
              COINTYPE_NETWORK[item.bip44.coinType]
            } network. Please confirm that you have ${
              COINTYPE_NETWORK[item.bip44.coinType]
            } App opened before switch network`,
            buttonText: `I have switched ${
              COINTYPE_NETWORK[item.bip44.coinType]
            } App`,
            confirmText: "Cancel",
            okButtonStyle: {
              backgroundColor: colors["orange-800"],
            },
            callback: () => onConfirm(item),
            cancelCallback: () => {
              Popup.hide();
            },
            bounciness: 0,
            duration: 10,
          });
          return;
        } else {
          appInitStore.selectAllNetworks(true);
        }
      } else {
        modalStore.close();
        if (!item.isAll) {
          ByteBrew.NewCustomEvent(`Select ${item?.chainName} Network`);
          chainStore.selectChain(item?.chainId);
          await chainStore.saveLastViewChainId();
          appInitStore.selectAllNetworks(false);
          modalStore.close();
        } else {
          ByteBrew.NewCustomEvent("Select All Network");
          appInitStore.selectAllNetworks(true);
        }
      }
    } catch (error) {
      showToast({
        type: "danger",
        message: JSON.stringify(error),
      });
    }
  }, []);
  const { totalPriceBalance, dataTokens, dataTokensByChain } =
    appInitStore.getMultipleAssets;
  const fiatCurrency = priceStore.getFiatCurrency(priceStore.defaultVsCurrency);
  const _renderItem = ({ item }: { item }) => {
    let selected =
      item?.chainId === chainStore.current.chainId &&
      !appInitStore.getInitApp.isAllNetworks;

    if (item.isAll && appInitStore.getInitApp.isAllNetworks) {
      selected = true;
    }
    const oraiIcon =
      "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png";
    return (
      <TouchableOpacity
        style={{
          paddingLeft: 12,
          paddingRight: 8,
          paddingVertical: 9.5,
          borderRadius: 12,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: selected ? colors["neutral-surface-bg2"] : null,
        }}
        onPress={() => {
          handleSwitchNetwork(item);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 44,
              backgroundColor: colors["neutral-icon-on-dark"],
              marginRight: 16,
            }}
          >
            <OWIcon
              type="images"
              source={{
                uri: item?.stakeCurrency?.coinImageUrl || oraiIcon,
              }}
              size={28}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors["neutral-text-title"],
                fontWeight: "600",
              }}
            >
              {item?.chainName}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: colors["sub-text"],
                fontWeight: "400",
              }}
            >
              {!item.chainId
                ? new PricePretty(fiatCurrency, totalPriceBalance)?.toString()
                : (
                    new PricePretty(
                      fiatCurrency,
                      dataTokensByChain?.[item.chainId]?.totalBalance
                    ) || initPrice
                  ).toString()}
            </Text>
          </View>
        </View>

        <View>
          <RadioButton
            color={
              selected
                ? colors["highlight-surface-active"]
                : colors["neutral-text-body"]
            }
            id={item.chainId}
            selected={selected}
            onPress={() => handleSwitchNetwork(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const chainsInfoWithBalance = chainStore.chainInfosInUI.map((item, index) => {
    return {
      ...item._chainInfo,
      balance: new PricePretty(
        fiatCurrency,
        appInitStore.getMultipleAssets.dataTokensByChain?.[
          item.chainId
        ]?.totalBalance
      ),
    };
  });
  const sortChainsByPrice = (chains) => {
    return chains.sort(
      (a, b) =>
        Number(b.balance.toDec().toString()) -
        Number(a.balance.toDec().toString())
    );
  };
  const dataTestnet = sortChainsByPrice(chainsInfoWithBalance).filter(
    (c) =>
      c.chainName.toLowerCase().includes("test") &&
      c.chainName.toLowerCase().includes(keyword.toLowerCase())
  );
  const dataMainnet = sortChainsByPrice(chainsInfoWithBalance).filter(
    (c) =>
      !c.chainName.toLowerCase().includes("test") &&
      c.chainName.toLowerCase().includes(keyword.toLowerCase())
  );
  const dataChains = activeTab === "testnet" ? dataTestnet : dataMainnet;

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...typography.h6,
          fontWeight: "900",
          color: colors["neutral-text-title"],
          width: "100%",
          textAlign: "center",
        }}
      >
        {`choose networks`.toUpperCase()}
      </Text>
      <View style={styles.header}>
        <View style={styles.searchInput}>
          <View style={{ paddingRight: 4 }}>
            <OWIcon
              color={colors["neutral-icon-on-light"]}
              name="tdesign_search"
              size={16}
            />
          </View>
          <TextInput
            style={{
              fontFamily: "SpaceGrotesk-Regular",
              width: "100%",
              color: colors["neutral-icon-on-light"],
            }}
            onChangeText={(t) => setKeyword(t)}
            value={keyword}
            placeholderTextColor={colors["neutral-text-body"]}
            placeholder="Search by name"
          />
        </View>
      </View>
      <View style={styles.wrapHeaderTitle}>
        <OWButton
          type="link"
          label={"Mainnet"}
          textStyle={{
            color: colors["primary-surface-default"],
            fontWeight: "600",
            fontSize: 16,
          }}
          onPress={() => setActiveTab("mainnet")}
          style={[
            {
              width: "50%",
            },
            activeTab === "mainnet" ? styles.active : null,
          ]}
        />
        <OWButton
          type="link"
          label={"Testnet"}
          onPress={() => setActiveTab("testnet")}
          textStyle={{
            color: colors["primary-surface-default"],
            fontWeight: "600",
            fontSize: 16,
          }}
          style={[
            {
              width: "50%",
            },
            activeTab === "testnet" ? styles.active : null,
          ]}
        />
      </View>
      <View
        style={{
          marginTop: spacing["12"],
          width: metrics.screenWidth - 48,
          justifyContent: "space-between",
          height: metrics.screenHeight / 2,
        }}
      >
        {!hideAllNetwork &&
          _renderItem({ item: { chainName: "All networks", isAll: true } })}
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={dataChains}
          renderItem={_renderItem}
          keyExtractor={_keyExtract}
        />
      </View>
    </View>
  );
};

const styling = (colors) =>
  StyleSheet.create({
    containerBtn: {
      backgroundColor: colors["neutral-surface-card"],
      paddingVertical: spacing["16"],
      borderRadius: spacing["8"],
      paddingHorizontal: spacing["16"],
      flexDirection: "row",
      marginTop: spacing["16"],
      alignItems: "center",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      alignSelf: "center",
      marginTop: 16,
    },
    searchInput: {
      flexDirection: "row",
      backgroundColor: colors["neutral-surface-action"],
      height: 40,
      borderRadius: 999,
      width: metrics.screenWidth - 32,
      alignItems: "center",
      paddingHorizontal: 12,
    },
    wrapHeaderTitle: {
      flexDirection: "row",
      paddingBottom: 12,
    },
    active: {
      borderBottomColor: colors["primary-surface-default"],
      borderBottomWidth: 2,
    },
  });
