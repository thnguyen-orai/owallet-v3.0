import images from "@src/assets/images";
import { Platform } from "react-native";
import { ChainIdEnum, isMilliseconds } from "@owallet/common";

const fetchWrap = require("fetch-retry")(global.fetch);

export const fetchRetry = async (url, config?: any) => {
  const response = await fetchWrap(url, {
    retries: 3,
    retryDelay: 1000,
    ...config,
  });
  if (response.status !== 200) return;
  const jsonRes = await response.json();
  return jsonRes;
};
export const HEADER_KEY = {
  notShowHeader: "NOT_SHOW_HEADER",
  showNetworkHeader: "SHOW_NETWORK_HEADER",
};
export const isAndroid = Platform.OS === "android";
export const isIos = Platform.OS === "ios";
export const defaultAll = { label: "All", value: "All", image: images.crypto };
export const SCREENS = {
  Home: "Home",
  TransactionDetail: "Transactions.Detail",
  BackupMnemonic: "BackupMnemonic",
  RecoveryPhrase: "RecoveryPhrase",
  RegisterMain: "RegisterMain",
  BuyFiat: "BuyFiat",
  RegisterVerifyMnemonicMain: "RegisterVerifyMnemonicMain",
  RegisterEnd: "Register.End",
  RegisterDone: "Register.Done",
  RegisterRecoverMnemonicMain: "RegisterRecoverMnemonicMain",
  RegisterRecoverPhraseMain: "RegisterRecoverPhraseMain",
  RegisterNewLedgerMain: "RegisterNewLedgerMain",
  Tokens: "Tokens",
  Nfts: "Nfts",
  NftsDetail: "Nfts.Detail",
  HistoryDetail: "History.Detail",
  TokenDetails: "Token.Details",
  UniversalSwapScreen: "UniversalSwapScreen",
  RegisterIntro: "Register.Intro",
  RegisterNewUser: "Register.NewUser",
  RegisterNotNewUser: "Register.NotNewUser",
  RegisterNewMnemonic: "Register.NewMnemonic",
  RegisterNewPincode: "Register.NewPincode",
  RegisterVerifyMnemonic: "Register.VerifyMnemonic",
  RegisterRecoverMnemonic: "Register.RecoverMnemonic",
  RegisterRecoverPhrase: "Register.RecoverPhrase",
  RegisterNewLedger: "Register.NewLedger",
  PincodeScreen: "PincodeScreen",
  Send: "Send",
  SendEvm: "SendEvm",
  SendOasis: "SendOasis",
  TransferNFT: "TransferNFT",
  Transactions: "Transactions",
  Dashboard: "Dashboard",
  Camera: "Camera",
  QRScreen: "QRScreen",
  Governance: "Governance",
  GovernanceDetails: "Governance.Details",
  NetworkSelect: "Network.select",
  NetworkToken: "Network.token",
  ValidatorDetails: "Validator.Details",
  ValidatorList: "Validator.List",
  TxPendingResult: "TxPendingResult",
  TxSuccessResult: "TxSuccessResult",
  TxFailedResult: "TxFailedResult",
  Setting: "Setting",
  SettingSelectAccount: "SettingSelectAccount",
  SettingViewPrivateData: "Setting.ViewPrivateData",
  SettingBackupMnemonic: "Setting.BackupMnemonic",
  SettingVersion: "Setting.Version",
  DetailsBrowser: "Detail.Browser",
  AddressBook: "AddressBook",
  AddAddressBook: "AddAddressBook",
  Browser: "Browser",
  BookMarks: "BookMarks",
  WebIntro: "Web.Intro",
  WebDApp: "Web.dApp",
  Invest: "Invest",
  Delegate: "Delegate",
  NewSend: "NewSend",
  SendTron: "SendTron",
  SendBtc: "SendBtc",
  Notifications: "Notifications",
  DelegateDetail: "Delegate.Detail",
  Redelegate: "Redelegate",
  Undelegate: "Undelegate",
  TABS: {
    Main: "Main",
    Home: "Home",
    Browser: "Browser",
    Invest: "Invest_Tab",
    Settings: "Settings",
    SendNavigation: "SendNavigation",
  },
  STACK: {
    Pincode: "Pincode",
    PincodeUnlock: "PincodeUnlock",
    Unlock: "Unlock",
    RecoverPhraseScreen: "RecoverPhraseScreen",
    MainTab: "MainTab",
    Register: "Register",
    Others: "Others",
    AddressBooks: "AddressBooks",
  },
};
export const ICONS_TITLE = {
  [SCREENS.TABS.Invest]: "tdesigntrending-up",
  [SCREENS.TABS.Main]: "tdesignchart-pie",
  [SCREENS.TABS.Browser]: "tdesigninternet",
  [SCREENS.TABS.Settings]: "tdesignsetting-1",
  [SCREENS.TABS.SendNavigation]: "",
};

export const SCREENS_OPTIONS: IScreenOption = {
  [SCREENS.TABS.Invest]: {
    title: "Stake",
  },
  [SCREENS.TABS.Main]: {
    title: "Assets",
  },
  [SCREENS.TABS.Browser]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.TABS.Settings]: {
    title: "Settings",
  },
  [SCREENS.TABS.SendNavigation]: {
    title: "",
  },
  [SCREENS.Home]: {
    title: HEADER_KEY.showNetworkHeader,
    showTabBar: true,
  },
  [SCREENS.Invest]: {
    title: HEADER_KEY.showNetworkHeader,
    showTabBar: true,
  },
  [SCREENS.TransactionDetail]: {
    title: "Transaction Details",
  },
  [SCREENS.BackupMnemonic]: {
    showTabBar: false,
  },
  [SCREENS.RegisterMain]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterVerifyMnemonicMain]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterEnd]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterDone]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.DetailsBrowser]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterRecoverMnemonicMain]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNewLedgerMain]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Tokens]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.Nfts]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.NftsDetail]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.UniversalSwapScreen]: {
    // title: HEADER_KEY.notShowHeader,
    title: "Universal Swap",
  },
  [SCREENS.RegisterIntro]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNewUser]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNotNewUser]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNewMnemonic]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNewPincode]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterVerifyMnemonic]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterRecoverMnemonic]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RecoveryPhrase]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.RegisterNewLedger]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Send]: {
    title: "Send ",
  },
  [SCREENS.TransferNFT]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.Transactions]: {
    title: "Transaction History",
  },
  [SCREENS.Camera]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.QRScreen]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Governance]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.GovernanceDetails]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.Dashboard]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.NewSend]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SendTron]: {
    // title: "Send",
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.PincodeScreen]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SendOasis]: {
    // title: "Send",
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Notifications]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.NetworkSelect]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.NetworkToken]: {
    // title: HEADER_KEY.showNetworkHeader,
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.ValidatorDetails]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.ValidatorList]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.TxPendingResult]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.TxSuccessResult]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.TxFailedResult]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Setting]: {
    title: HEADER_KEY.notShowHeader,
    showTabBar: true,
  },
  [SCREENS.SettingSelectAccount]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SettingViewPrivateData]: {
    title: "Mnemonic Seed",
  },
  [SCREENS.HistoryDetail]: {
    title: "Transaction details",
  },
  [SCREENS.BuyFiat]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SettingVersion]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SendBtc]: {
    // title: "Send",
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.SendEvm]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.AddressBook]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.AddAddressBook]: {
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Browser]: {
    title: "Browser",
    showTabBar: true,
  },
  [SCREENS.BookMarks]: {
    title: "Bookmarks",
  },
  [SCREENS.WebIntro]: {
    title: "",
  },
  [SCREENS.WebDApp]: {
    title: "",
  },
  [SCREENS.Delegate]: {
    // title: HEADER_KEY.showNetworkHeader,
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.DelegateDetail]: {
    title: HEADER_KEY.showNetworkHeader,
  },
  [SCREENS.Redelegate]: {
    // title: HEADER_KEY.showNetworkHeader,
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.Undelegate]: {
    // title: HEADER_KEY.showNetworkHeader,
    title: HEADER_KEY.notShowHeader,
  },
  [SCREENS.STACK.Unlock]: {
    title: "",
  },
  [SCREENS.STACK.RecoverPhraseScreen]: {
    title: "",
  },
  [SCREENS.STACK.PincodeUnlock]: {
    title: "",
  },
  [SCREENS.STACK.Pincode]: {
    title: "",
  },
  [SCREENS.STACK.Pincode]: {
    title: "",
  },
  [SCREENS.STACK.MainTab]: {
    title: "",
  },
  [SCREENS.STACK.Register]: {
    title: "",
  },
  [SCREENS.STACK.Others]: {
    title: "",
  },
  [SCREENS.STACK.AddressBooks]: {
    title: "",
  },
};
export const TYPE_ACTIONS_COSMOS_HISTORY = {
  ["delegate"]: "delegate",
  ["send"]: "send",
  ["receive"]: "receive",
  ["withdraw_delegator_reward"]: "withdraw_delegator_reward",
  ["begin_redelegate"]: "begin_redelegate",
  ["begin_unbonding"]: "begin_unbonding",
  ["transfer"]: "transfer",
  ["execute"]: "execute",
  ["wasm/MsgExecuteContract"]: "/cosmwasm.wasm.v1.MsgExecuteContract",
  ["bank/MsgSend"]: "/cosmos.bank.v1beta1.MsgSend",
  ["distribution/MsgWithdrawDelegatorReward"]:
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
  ["staking/MsgDelegate"]: "/cosmos.staking.v1beta1.MsgDelegate",
  ["staking/MsgUndelegate"]: "/cosmos.staking.v1beta1.MsgUndelegate",
  ["submit_proposal"]: "submit_proposal",
  ["gov/MsgSubmitProposal"]: "/cosmos.gov.v1beta1.MsgSubmitProposal",
};
export const TITLE_TYPE_ACTIONS_COSMOS_HISTORY = {
  [TYPE_ACTIONS_COSMOS_HISTORY.receive]: "Receive",
};
export const EVENTS = {
  hiddenTabBar: "hiddenTabBar",
};
export const urlTxHistory = "https://tx-history-backend.oraidex.io/";
export const urlAiRight = "https://developers.airight.io";
// export const urlTxHistory = "http://10.10.20.115:8000/";
// export const urlTxHistory = "https://tx-history-backend-staging.oraidex.io/";
export const listSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const getTimeMilliSeconds = (timeStamp) => {
  if (isMilliseconds(timeStamp)) {
    return timeStamp;
  }
  return timeStamp * 1000;
};
