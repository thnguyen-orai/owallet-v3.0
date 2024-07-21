import { Dec } from "@owallet/unit";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SCREENS } from "@src/common/constants";
import { OWButton } from "@src/components/button";
import OWIcon from "@src/components/ow-icon/ow-icon";
import { Text } from "@src/components/text";
import { checkRouter } from "@src/router/root";
import { useTheme } from "@src/themes/theme-provider";
import { convertArrToObject, showToast } from "@src/utils/helper";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { OWBox } from "../../../components/card";
import { useSmartNavigation } from "../../../navigation.provider";
import { useStore } from "../../../stores";
import { metrics, spacing } from "../../../themes";
import ByteBrew from "react-native-bytebrew-sdk";
import { ChainIdEnum } from "@oraichain/oraidex-common";

export const EarningCardNew = observer(({}) => {
  const route = useRoute<RouteProp<Record<string, {}>, string>>();
  const smartNavigation = useSmartNavigation();
  const {
    chainStore,
    accountStore,
    queriesStore,
    priceStore,
    analyticsStore,
    appInitStore,
  } = useStore();
  if (
    chainStore.current.networkType !== "cosmos" &&
    !appInitStore.getInitApp.isAllNetworks
  )
    return;
  const navigation = useNavigation();
  //This is default chain when network is all network
  const defaultChain = ChainIdEnum.Oraichain;
  const { colors } = useTheme();
  const chainId = appInitStore.getInitApp.isAllNetworks
    ? defaultChain
    : chainStore.current.chainId;
  const styles = styling(colors);
  const queries = queriesStore.get(chainId);
  const account = accountStore.getAccount(chainId);
  const queryReward = queries.cosmos.queryRewards.getQueryBech32Address(
    account.bech32Address
  );
  const stakingReward = queryReward.stakableReward;
  const totalStakingReward = priceStore.calculatePrice(stakingReward);
  const queryDelegated = queries.cosmos.queryDelegations.getQueryBech32Address(
    account.bech32Address
  );
  const delegated = queryDelegated.total;
  const totalPrice = priceStore.calculatePrice(delegated);

  const _onPressStake = () => {
    if (checkRouter(route?.name, SCREENS.Invest)) {
      return;
    }
    navigation.dispatch(
      StackActions.replace("MainTab", { screen: SCREENS.TABS.Invest })
    );
  };

  const _onPressCompound = async () => {
    try {
      const firstValidator =
        queryReward.getDescendingPendingRewardValidatorAddresses(10)?.[0];

      if (firstValidator && firstValidator !== "") {
        ByteBrew.NewCustomEvent(`${chainStore.current.chainName} Compound`);
        await account.cosmos.sendWithdrawAndDelegationRewardMsgs(
          queryReward.getDescendingPendingRewardValidatorAddresses(10),
          firstValidator,
          stakingReward?.shrink(true).maxDecimals(6).hideDenom(true).toString(),
          "",
          {},
          {},
          {
            onBroadcasted: (txHash) => {
              analyticsStore.logEvent("Compound reward tx broadcasted", {
                chainId: chainId,
                chainName: chainStore.current.chainName,
              });

              const validatorObject = convertArrToObject(
                queryReward.pendingRewardValidatorAddresses
              );
              smartNavigation.pushSmart("TxPendingResult", {
                txHash: Buffer.from(txHash).toString("hex"),
                title: "Compound",
                data: {
                  ...validatorObject,
                  amount: stakingReward?.toCoin(),
                  currency: chainStore.current.stakeCurrency,
                  type: "claim",
                },
              });
            },
          },
          stakingReward.currency.coinMinimalDenom
        );
      } else {
        showToast({
          message: "There is no validator to stake!",
          type: "danger",
        });
      }
    } catch (e) {
      console.error({ errorClaim: e });
      if (!e?.message?.startsWith("Transaction Rejected")) {
        showToast({
          message:
            e?.message ?? "Something went wrong! Please try again later.",
          type: "danger",
        });
        return;
      }
    }
  };

  const _onPressClaim = async () => {
    try {
      ByteBrew.NewCustomEvent(`${chainStore.current.chainName} Claim`);
      await account.cosmos.sendWithdrawDelegationRewardMsgs(
        queryReward.getDescendingPendingRewardValidatorAddresses(10),
        "",
        {},
        {},
        {
          onBroadcasted: (txHash) => {
            analyticsStore.logEvent("Claim reward tx broadcasted", {
              chainId: chainId,
              chainName: chainStore.current.chainName,
            });

            const validatorObject = convertArrToObject(
              queryReward.pendingRewardValidatorAddresses
            );
            smartNavigation.pushSmart("TxPendingResult", {
              txHash: Buffer.from(txHash).toString("hex"),
              title: "Withdraw rewards",
              data: {
                ...validatorObject,
                amount: stakingReward?.toCoin(),
                currency: chainStore.current.stakeCurrency,
                type: "claim",
              },
            });
          },
        },
        stakingReward.currency.coinMinimalDenom
      );
    } catch (e) {
      console.error({ errorClaim: e });
      if (!e?.message?.startsWith("Transaction Rejected")) {
        showToast({
          message:
            e?.message ?? "Something went wrong! Please try again later.",
          type: "danger",
        });
        return;
      }
    }
  };
  const isDisableClaim =
    !account.isReadyToSendMsgs ||
    stakingReward.toDec().equals(new Dec(0)) ||
    queryReward.pendingRewardValidatorAddresses.length === 0;
  return (
    <OWBox
      style={{
        marginHorizontal: 16,
        width: metrics.screenWidth - 32,
        marginTop: 8,
        backgroundColor: colors["neutral-surface-card"],
        padding: spacing["16"],
      }}
    >
      <View>
        <View style={styles.cardBody}>
          <TouchableOpacity onPress={_onPressStake}>
            <View style={{ flexDirection: "row", paddingBottom: 6 }}>
              <View style={styles["claim-title"]}>
                <OWIcon
                  name={"trending-outline"}
                  size={14}
                  color={colors["neutral-text-title"]}
                />
              </View>
              <Text style={[{ ...styles["text-earn"] }]}>
                Claimable rewards
              </Text>
            </View>

            <Text
              style={[
                {
                  ...styles["text-amount"],
                },
              ]}
            >
              +
              {totalStakingReward
                ? totalStakingReward.toString()
                : stakingReward.shrink(true).maxDecimals(6).toString()}
            </Text>
            <Text style={[styles["amount"]]}>
              {stakingReward.toDec().gt(new Dec(0.001))
                ? stakingReward
                    .shrink(true)
                    .maxDecimals(6)
                    .trim(true)
                    .upperCase(true)
                    .toString()
                : `< 0.001 ${stakingReward.toCoin().denom.toUpperCase()}`}
            </Text>
          </TouchableOpacity>
          <OWButton
            style={[
              styles["btn-claim"],
              {
                backgroundColor: isDisableClaim
                  ? colors["neutral-surface-disable"]
                  : colors["primary-surface-default"],
              },
            ]}
            textStyle={{
              fontSize: 15,
              fontWeight: "600",
              color: isDisableClaim
                ? colors["neutral-text-disable"]
                : colors["neutral-text-action-on-dark-bg"],
            }}
            label="Compound"
            onPress={_onPressCompound}
            loading={account.isSendingMsg === "withdrawRewards"}
            disabled={isDisableClaim}
          />
        </View>
        <View
          style={{
            backgroundColor: colors["primary-surface-subtle"],
            marginTop: 6,
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text weight="500" color={colors["neutral-text-action-on-light-bg"]}>
            Staked:{" "}
            {totalPrice
              ? totalPrice.toString()
              : delegated.shrink(true).maxDecimals(6).toString()}
          </Text>
          <Text weight="500" color={colors["neutral-text-action-on-light-bg"]}>
            {delegated
              .shrink(true)
              .maxDecimals(6)
              .trim(true)
              .upperCase(true)
              .toString()}
          </Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <OWButton
          textStyle={{
            fontSize: 15,
            fontWeight: "600",
            color: colors["neutral-text-action-on-light-bg"],
          }}
          icon={
            <OWIcon
              color={colors["neutral-text-action-on-light-bg"]}
              name={"tdesigngift"}
              size={20}
            />
          }
          type="link"
          style={styles.getStarted}
          label={"Claim"}
          disabled={isDisableClaim}
          onPress={_onPressClaim}
        />
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: colors["neutral-border-default"],
          }}
        />
        <OWButton
          style={styles.getStarted}
          type="link"
          icon={
            <OWIcon
              color={colors["neutral-text-action-on-light-bg"]}
              name={"tdesignwealth-1"}
              size={20}
            />
          }
          textStyle={{
            fontSize: 15,
            fontWeight: "600",
            color: colors["neutral-text-action-on-light-bg"],
          }}
          label="Stake"
          onPress={_onPressStake}
        />
      </View>
    </OWBox>
  );
});

const styling = (colors) =>
  StyleSheet.create({
    cardBody: {},
    "flex-center": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "text-earn": {
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 24,
      color: colors["neutral-text-title"],
    },
    "text-amount": {
      fontWeight: "500",
      fontSize: 28,
      lineHeight: 34,
      color: colors["success-text-body"],
    },

    amount: {
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 20,
      color: colors["neutral-text-title"],
    },
    "btn-claim": {
      backgroundColor: colors["primary-surface-default"],
      // borderWidth: 0.5,
      marginTop: 16,
      borderRadius: 999,
      width: metrics.screenWidth / 4,
      height: 32,
      position: "absolute",
      right: 0,
      bottom: 10,
    },
    "claim-title": {
      width: 24,
      height: 24,
      borderRadius: 24,
      backgroundColor: colors["neutral-surface-action"],
      marginRight: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    getStarted: {
      borderRadius: 999,
      width: metrics.screenWidth / 2.45,
      height: 32,
    },

    btnGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      borderTopColor: colors["neutral-border-default"],
      borderTopWidth: 1,
      paddingTop: 8,
    },
  });
