import { navigate } from "../../router/root";
import isValidDomain from "is-valid-domain";
import { find } from "lodash";
import moment from "moment";
import { AppCurrency } from "@owallet/types";
import get from "lodash/get";
import { TxsHelper } from "@src/stores/txs/helpers/txs-helper";
import { showMessage, MessageOptions } from "react-native-flash-message";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import {
  flattenTokens,
  getSubAmountDetails,
  toAmount,
  toDisplay,
  toSumDisplay,
  tokensIcon,
} from "@oraichain/oraidex-common";
import { API } from "@src/common/api";
import { ChainIdEnum, Network } from "@owallet/common";
import { Dec } from "@owallet/unit";

const SCHEME_IOS = "owallet://open_url?url=";
const SCHEME_ANDROID = "app.owallet.oauth://google/open_url?url=";
export const ORAICHAIN_ID = "Oraichain";
export const KAWAII_ID = "kawaii_6886-1";
export const ETH_ID = "0x01";
export const TRON_BIP39_PATH_PREFIX = "m/44'/195'";
export const BIP44_PATH_PREFIX = "m/44'";
export const FAILED = "FAILED";
export const SUCCESS = "SUCCESS";
export const TRON_BIP39_PATH_INDEX_0 = TRON_BIP39_PATH_PREFIX + "/0'/0/0";

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
    type: "cw20",
    coinDenom: "wTRX",
    coinMinimalDenom:
      "cw20:orai1c7tpjenafvgjtgm9aqwm7afnke6c56hpdms8jc6md40xs3ugd0es5encn0:wTRX",
    contractAddress:
      "orai1c7tpjenafvgjtgm9aqwm7afnke6c56hpdms8jc6md40xs3ugd0es5encn0",
    coinDecimals: 6,
    coinGeckoId: "tron",
    coinImageUrl:
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
  },
];
export const handleError = (error, url, method) => {
  if (__DEV__) {
    console.log(`[1;34m: ---------------------------------------`);
    console.log(`[1;34m: handleError -> url`, url);
    console.log(`[1;34m: handleError -> method`, method);
    console.log(`[1;34m: handleError -> error`, JSON.stringify(error));
    console.log(`[1;34m: ---------------------------------------`);
  }
};
export const showToast = ({ ...params }: MessageOptions) => {
  showMessage({
    type: params?.type ?? "success",
    duration: 5000,
    ...params,
  });
  return;
};

export function splitAndSortChains(data) {
  // Initialize arrays for test and non-test chains
  const testChains = [];
  const mainChains = [];

  // Iterate through each key in the data object
  for (const chainId in data) {
    const chain = data[chainId];
    const chainName = chain.chainInfo.chainName;
    const chainImage = chain.chainInfo.chainImage;
    const totalBalance = Number(chain.totalBalance || 0);

    // Create an object for easy sorting and storing
    const chainData = {
      chainId: chainId,
      chainName: chainName,
      chainImage: chainImage,
      totalBalance: totalBalance,
    };

    // Check if chainName contains "test" and push to respective array
    if (chainName.toLowerCase().includes("test")) {
      testChains.push(chainData);
    } else {
      mainChains.push(chainData);
    }
  }

  // Sort arrays by totalBalance in descending order
  testChains.sort((a, b) => b.totalBalance - a.totalBalance);
  mainChains.sort((a, b) => b.totalBalance - a.totalBalance);

  return { testChains, mainChains };
}

export const handleDeepLink = async ({ url }) => {
  if (url) {
    const path = url.replace(SCHEME_ANDROID, "").replace(SCHEME_IOS, "");
    if (!url.indexOf(SCHEME_ANDROID)) {
      navigate("Browser", { path });
    }

    if (url.indexOf(SCHEME_IOS) === 0) {
      navigate("Browser", { path });
    }
  }
};

export const checkValidDomain = (url: string) => {
  if (isValidDomain(url)) {
    return true;
  }
  // try with URL
  try {
    const { origin } = new URL(url);
    return origin?.length > 0;
  } catch {
    return false;
  }
};

export const _keyExtract = (item, index) => index.toString();

export const formatContractAddress = (address: string, limitFirst = 10) => {
  const fristLetter = address?.slice(0, limitFirst) ?? "";
  const lastLetter = address?.slice(-5) ?? "";

  return `${fristLetter}...${lastLetter}`;
};
export const convertArrToObject = (arr, label = `Validator`) => {
  if (!arr?.length) return;
  var rv = {};
  for (var i = 0; i < arr?.length; ++i) rv[`${label}${i + 1}`] = arr[i];
  return rv;
};
export const removeDataInParentheses = (inputString: string): string => {
  if (!inputString) return;
  return inputString.replace(/\([^)]*\)/g, "");
};
export const extractDataInParentheses = (
  inputString: string
): string | null => {
  if (!inputString) return;
  const startIndex = inputString.indexOf("(");
  const endIndex = inputString.indexOf(")");
  if (startIndex !== -1 && endIndex !== -1) {
    return inputString.substring(startIndex + 1, endIndex);
  } else {
    return null;
  }
};

export function limitString(str, limit) {
  if (str && str?.length > limit) {
    return str.slice(0, limit) + "...";
  } else {
    return str;
  }
}

// capital first letter of string
export const capitalizedText = (text: string) => {
  if (!text) return;
  return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
};

export const TRANSACTION_TYPE = {
  DELEGATE: "MsgDelegate",
  UNDELEGATE: "MsgUndelegate",
  CLAIM_REWARD: "MsgWithdrawDelegationReward",
  WITHDRAW: "MsgWithdrawDelegatorReward",
  SEND: "MsgSend",
  INSTANTIATE_CONTRACT: "MsgInstantiateContract",
  EXECUTE_CONTRACT: "MsgExecuteContract",
};

export const getValueFromDataEvents = (arr) => {
  if (arr.length === 1) {
    return { value: [arr[0]], typeId: 1 };
  }
  let result = [];
  for (let item of arr) {
    // if any element has amountValue, push it to the result array
    if (item?.transferInfo.some((data) => data?.amount)) {
      result.push(item);
    }
  }

  // if the result array is empty, return null and typeId = 0
  if (result.length === 0) {
    return { value: [], typeId: 0 };
  }
  // if the result array has one element, return it and typeId = 2
  if (result.length === 1) {
    return { value: [result[0]], typeId: 2 };
  }

  // if the result array has more than one element, return it and typeId = 3
  return { value: result, typeId: 3 };
};
export const getDataFromDataEvent = (itemEvents) => {
  return countAmountValue(itemEvents?.value[0]?.transferInfo) < 2
    ? {
        ...itemEvents?.value[0],
        ...itemEvents?.value[0]?.transferInfo[0],
      }
    : {
        ...itemEvents?.value[0],
        ...{
          amount: "More",
          denom: false,
          isPlus: false,
          isMinus: false,
        },
      };
};

export const maskedNumber = (
  number: number | string,
  digits: number = 4,
  minDigits: number = 0,
  locales: string = "en-US"
) => {
  return number
    ? Number(number).toLocaleString(locales, {
        maximumFractionDigits: digits,
        minimumFractionDigits: minDigits,
      })
    : "0";
};

const countAmountValue = (array) => {
  let count = 0;
  if (array && array?.length > 0) {
    for (let element of array) {
      if (element?.amountValue) {
        count++;
      }
    }
  }
  return count;
};

const configBrowser = {
  // iOS Properties
  dismissButtonStyle: "Close",
  preferredBarTintColor: "#453AA4",
  preferredControlTintColor: "white",
  readerMode: false,
  animated: true,
  modalPresentationStyle: "fullScreen",
  modalTransitionStyle: "coverVertical",
  modalEnabled: true,
  enableBarCollapsing: true,
  // Android Properties
  showTitle: true,
  toolbarColor: "#6200EE",
  hasBackButton: true,
  secondaryToolbarColor: "black",
  enableUrlBarHiding: false,
  enableDefaultShare: true,
  showInRecents: true,
  forceCloseOnRedirection: false,
  // Specify full animation resource identifier(package:anim/name)
  // or only resource name(in case of animation bundled with app).
  animations: {
    startEnter: "slide_in_right",
    startExit: "slide_out_left",
    endEnter: "slide_in_left",
    endExit: "slide_out_right",
  },
};
export const openLink = async (url) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, configBrowser);
    } else Linking.openURL(url);
  } catch (error) {
    console.log("error: ", error);
    // Alert.alert(error.message);
  }
};

export function parseObjectToQueryString(obj) {
  let params = new URLSearchParams();
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      for (let value of obj[key]) {
        params.append(key, value);
      }
    } else {
      params.append(key, obj[key]);
    }
  }
  return "?" + params.toString();
}

export function removeEmptyElements(array) {
  return array.filter((element) => !!element);
}

export function formarPriceWithDigits(amount, numOfDigits = 2) {
  return Number(amount).toFixed(numOfDigits);
}

function convertVarToWord(str) {
  const words = str && str.split("_");
  const capitalizedWords =
    words && words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords && capitalizedWords.join(" ");
}

export function removeSpecialChars(str) {
  return str.replace(/[^\w\s]/gi, "");
}

function addSpacesToString(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const getTransactionValue = ({ data, address, logs }) => {
  const transactionType = data?.[0]?.type;
  let valueAmount = data?.[0]?.value?.amount;
  const events = logs?.[0]?.events;
  let eventType = null;
  let unbond = null;
  let isRecipient = false;
  if (
    checkType(transactionType, TRANSACTION_TYPE.CLAIM_REWARD) ||
    checkType(transactionType, TRANSACTION_TYPE.WITHDRAW)
  ) {
    eventType = "withdraw_rewards";
  }
  if (checkType(transactionType, TRANSACTION_TYPE.DELEGATE)) {
    eventType = "delegate";
  }
  if (
    checkType(transactionType, TRANSACTION_TYPE.SEND) ||
    checkType(transactionType, TRANSACTION_TYPE.UNDELEGATE)
  ) {
    eventType = "transfer";
  }
  if (events && eventType) {
    const value = find(events, { type: eventType });
    if (checkType(transactionType, TRANSACTION_TYPE.UNDELEGATE)) {
      unbond = getUnbondInfo(logs?.[0]?.events);
    }

    const amountReward = value && find(value?.attributes, { key: "amount" });
    const recipient = value && find(value?.attributes, { key: "recipient" });
    if (recipient?.value === address) {
      isRecipient = true;
    }
    valueAmount = {
      // eslint-disable-next-line no-useless-escape
      amount: amountReward?.value?.replace(/[^0-9\.]+/g, ""),
      denom: amountReward?.value?.replace(/^\d+/g, "") || "orai",
    };
  }

  const amount = valueAmount?.amount || valueAmount?.[0]?.amount || 0;
  const denom = valueAmount?.denom || valueAmount?.[0]?.denom;
  let title, isPlus;

  switch (true) {
    case checkType(transactionType, TRANSACTION_TYPE.DELEGATE):
      title = "Delegated";

      isPlus = false;
      break;

    case checkType(transactionType, TRANSACTION_TYPE.UNDELEGATE):
      title = "Un-Delegated";

      isPlus = true;
      break;

    case checkType(transactionType, TRANSACTION_TYPE.CLAIM_REWARD):
    case checkType(transactionType, TRANSACTION_TYPE.WITHDRAW):
      title = "Reward";

      isPlus = true;
      break;

    case checkType(transactionType, TRANSACTION_TYPE.SEND): {
      title = "Send Token";

      if (isRecipient) {
        title = "Received Token";

        isPlus = true;
      }
      break;
    }

    case checkType(transactionType, TRANSACTION_TYPE.EXECUTE_CONTRACT): {
      title = "Execute Contract";

      if (isRecipient) {
        title = "Execute Contract";

        isPlus = true;
      }
      break;
    }

    case checkType(transactionType, TRANSACTION_TYPE.INSTANTIATE_CONTRACT): {
      title = "Instantiate Contract";

      break;
    }
    default:
      break;
  }

  return { title, isPlus, amount, denom, unbond };
};

export const checkType = (str, type) => str?.indexOf?.(type) >= 0;

export const getUnbondInfo = (events = []) => {
  const unbond = find(events, { type: "unbond" });
  const unbondValue = find(unbond.attributes, { key: "amount" });
  const unbondCompleted = find(unbond.attributes, {
    key: "completion_time",
  });

  const date = moment(unbondCompleted.value);
  const isCompleted = moment(date).isBefore(moment());

  return {
    isCompleted,
    date,
    value: unbondValue?.value,
  };
};

export const convertAmount = (amount: any) => {
  switch (typeof amount) {
    case "string":
    case "number":
      return Number(amount) / Math.pow(10, 6);
    default:
      return 0;
  }
};

export const getDomainFromUrl = (url) => {
  if (!url) {
    return "";
  }
  return `${url?.match?.(
    // eslint-disable-next-line no-useless-escape
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim
  )}`
    .replace("https://", "")
    .replace("http://", "");
};

export const parseIbcMsgRecvPacket = (denom) => {
  return denom?.slice(0, 1) === "u" ? denom?.slice(1, denom?.length) : denom;
};

export function addTimeProperty(array1, array2) {
  // Create a new object with heightId as the key and time as the value
  const timeMap = {};
  array1.forEach((obj) => {
    timeMap[obj?.block?.header?.height] = obj?.block?.header?.time;
  });

  // Add time property to each object in array2 based on heightId
  array2.forEach((obj) => {
    obj.time = timeMap[obj?.height];
  });

  return array2;
}

export const getTxTypeNew = (type, rawLog = "[]", result = "") => {
  if (type) {
    const typeArr = type.split(".");
    let typeMsg = typeArr?.[typeArr?.length - 1];
    if (typeMsg === "MsgExecuteContract" && result === "Success") {
      let rawLogArr = JSON.parse(rawLog);
      for (let event of rawLogArr?.[0].events) {
        if (event?.["type"] === "wasm") {
          for (let att of event?.["attributes"]) {
            if (att?.["key"] === "action") {
              let attValue = att?.["value"]
                .split("_")
                .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join("");
              typeMsg += "/" + attValue;
              break;
            }
          }

          break;
        }
      }
    }
    return typeMsg;
  }
  return "Msg";
};

export const parseIbcMsgTransfer = (
  rawLog,
  type = "send_packet",
  key = "packet_data"
) => {
  const arrayIbcDemonPacket =
    rawLog && rawLog?.[0]?.events?.find((e) => e?.type === type);
  const ibcDemonPackData =
    arrayIbcDemonPacket &&
    arrayIbcDemonPacket?.attributes?.find((ele) => ele?.key === key);
  const ibcDemonObj =
    typeof ibcDemonPackData?.value === "string" ||
    ibcDemonPackData?.value instanceof String
      ? JSON.parse(ibcDemonPackData?.value ?? "{}")
      : { denom: "" };
  return ibcDemonObj;
};

export const formatOrai = (amount, decimal = 6) => {
  return Number(amount) / Math.pow(10, decimal);
};

export const getUnixTimes = (value, unit, startOf) => [
  moment()
    .startOf(startOf ?? "hour")
    .subtract(value, unit)
    .unix(),
  moment()
    .startOf(startOf ?? "hour")
    .add(3, "minute")
    .unix(),
];

export function nFormatter(num, digits: 1) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? {
        value: Number((num / item.value).toFixed(digits).replace(rx, "$1")),
        symbol: item.symbol,
      }
    : { value: 0, symbol: "" };
}

export const getAddressFromLedgerWhenChangeNetwork = (
  address,
  ledgerAddress
) => {
  if (address === ledgerAddress) {
    return ledgerAddress;
  }
  return null;
};

export const getTokenInfos = ({ tokens, prices, networkFilter = "" }) => {
  const dataTokens = flattenTokens
    .reduce((result, token) => {
      // not display because it is evm map and no bridge to option, also no smart contract and is ibc native
      if (token.bridgeTo || token.contractAddress) {
        const isValidNetwork =
          !networkFilter || token.chainId === networkFilter;
        if (isValidNetwork) {
          const amount = BigInt(tokens?.[token.denom] ?? 0);

          const isHaveSubAmounts = token.contractAddress && token.evmDenoms;
          const subAmounts = isHaveSubAmounts
            ? getSubAmountDetails(tokens, token)
            : {};
          const totalAmount =
            amount +
            (isHaveSubAmounts
              ? toAmount(toSumDisplay(subAmounts), token.decimals)
              : 0n);
          const value =
            toDisplay(totalAmount.toString(), token.decimals) *
            (prices?.[token.coinGeckoId] || 0);

          const SMALL_BALANCE = 0.01;
          const isHide = value < SMALL_BALANCE;
          if (isHide) return result;

          const tokenIcon = tokensIcon.find(
            (tIcon) => tIcon.coinGeckoId === token.coinGeckoId
          );

          result.push({
            asset: token.name,
            chain: token.org,
            chainId: token.chainId,
            cosmosBased: token.cosmosBased,
            contractAddress: token.contractAddress,
            decimals: token.decimals,
            coinType: token.coinType,
            coinGeckoId: token.coinGeckoId,
            icon: tokenIcon?.Icon,
            iconLight: tokenIcon?.IconLight,
            price: prices[token.coinGeckoId] || 0,
            balance: toDisplay(totalAmount.toString(), token.decimals),
            denom: token.denom,
            value,
            coeff: 0,
            coeffType: "increase",
          });
        }
      }
      return result;
    }, [])
    .sort((a, b) => b.value - a.value);

  return dataTokens;
};

export const getCurrencyByMinimalDenom = (
  tokens,
  minimalDenom
): AppCurrency => {
  if (tokens && tokens?.length > 0 && minimalDenom) {
    const info = tokens?.filter((item, index) => {
      if (item?.contractAddress) {
        return (
          item?.contractAddress?.toUpperCase() ==
          minimalDenom?.trim()?.toUpperCase()
        );
      } else if (item?.originCurrency) {
        return (
          item?.originCurrency?.coinMinimalDenom?.toUpperCase() ==
          minimalDenom?.trim()?.toUpperCase()
        );
      }
      return (
        item?.coinMinimalDenom?.toUpperCase() ==
        minimalDenom?.trim()?.toUpperCase()
      );
    });
    if (info?.length > 0) {
      return info[0];
    }
    return {
      coinDecimals: 0,
      coinDenom: minimalDenom,
      coinMinimalDenom: minimalDenom,
    };
  }
  return {
    coinDecimals: 0,
    coinDenom: minimalDenom,
    coinMinimalDenom: minimalDenom,
  };
};

export const isNegative = (number) => number <= 0;

export function createTxsHelper() {
  return new TxsHelper();
}

export function shortenAddress(address, digits = 6): string {
  if (address) {
    const firstDigits = address.substring(0, digits);
    const lastDigits = address.substring(address.length - digits);
    return firstDigits + "..." + lastDigits;
  }

  return "";
}

export { get };

export enum HISTORY_STATUS {
  SWAP = "SWAP",
  SEND = "SEND",
  STAKE = "STAKE",
  CLAIM = "CLAIM",
  UNSTAKE = "UN_STAKE",
}

export function isPrivateKey(str: string): boolean {
  if (str?.startsWith("0x") || str?.startsWith("zs")) {
    return true;
  }

  if (str.length === 64) {
    try {
      return Buffer.from(str, "hex").length === 32;
    } catch {
      return false;
    }
  }
  return false;
}

export function trimWordsStr(str: string): string {
  str = str.trim();
  // Split on the whitespace or new line.
  const splited = str.split(/\s+/);
  const words = splited
    .map((word) => word.trim())
    .filter((word) => word.trim().length > 0);
  return words.join(" ");
}

export const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const sortByVoting = (data, sortType) => {
  switch (sortType) {
    case "Voting Power":
      return data.sort((val1, val2) => {
        return new Dec(val1.tokens).gt(new Dec(val2.tokens)) ? -1 : 1;
      });
    case "Voting Power Increase":
      return data.sort((val1, val2) => {
        return new Dec(val1.tokens).gt(new Dec(val2.tokens)) ? 1 : -1;
      });
  }
};

export function groupAndShuffle(array, groupSize = 5, chainId, sortType) {
  if (chainId !== ChainIdEnum.Oraichain) {
    return sortByVoting(array, sortType);
  }
  const sortedArray = array
    .map((e) => {
      return { ...e, votingPowerMixUpTime: e.voting_power * e.uptime };
    })
    .sort((a, b) => b.votingPowerMixUpTime - a.votingPowerMixUpTime);
  const groups = [];
  for (let i = 0; i < sortedArray.length; i += groupSize) {
    groups.push(sortedArray.slice(i, i + groupSize));
  }
  const shuffledGroups = groups.map((group) => shuffleArray(group));
  return shuffledGroups;
}

export const formatPercentage = (
  value,
  numberOfDigitsAfterDecimalPoint = 1
) => {
  return parseFloat(
    (parseFloat(value) * 100).toFixed(numberOfDigitsAfterDecimalPoint)
  );
};

export const computeTotalVotingPower = (data) => {
  if (!data || !Array.isArray(data)) {
    return 0;
  }

  let total = 0;
  for (let item of data) {
    total += parseFloat(item?.voting_power ?? 0) || 0;
  }
  return total;
};

export function numberWithCommas(number) {
  // Convert the number to a string and split it into integer and decimal parts
  const [intPart, decPart] = number.toString().split(".");

  // Insert commas into the integer part
  const formattedNumber = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the formatted integer part and the decimal part
  return formattedNumber + "." + decPart;
}
