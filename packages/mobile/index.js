import './shim';

import 'text-encoding';

import 'react-native-url-polyfill/auto';
import * as Sentry from "@sentry/react-native";
import { NativeModules, Platform, AppRegistry } from "react-native";

// add router to send message
import './init';
import messaging from "@react-native-firebase/messaging";
import CodePush from "react-native-code-push";
import { name as appName } from "./app.json";
import firebase from "@react-native-firebase/app";
import ByteBrew from "react-native-bytebrew-sdk";

const { App } = require('./src/app');
const config = {
  apiKey: process.env.API_KEY,
  projectId: "owallet-829a1",
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};
// import {Text,View} from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context";
// const App = () => {
//   return (
//     <SafeAreaView>
//       <Text>xin chao ahiaihiaiahaihiahiahiahiha</Text>
//     </SafeAreaView>
//   );
// };
if (!__DEV__) {
  firebase.initializeApp(config);
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("remoteMessage background", remoteMessage);
  });
  // Initialize the ByteBrew SDK
  if (Platform.OS == "android") {
    ByteBrew.Initialize(process.env.BYTE_BREW_ID_ANDROID, process.env.BYTE_BREW_SDK_KEY_ANDROID);
  } else if (Platform.OS == "ios") {
    ByteBrew.Initialize(process.env.BYTE_BREW_ID_IOS, process.env.BYTE_BREW_SDK_KEY_IOS);
  }
  Sentry.init({
    dsn: "https://ab29c6e64d65418cb3b9f133dc601c23@o1323226.ingest.sentry.io/4504632450023424",
    tracesSampleRate: 0.7,
    environment: "production",
    ignoreErrors: [
      "Request rejected",
      "Failed to fetch",
      "Load failed",
      "User rejected the request",
      "SIGABRT",
      "ApplicationNotResponding",
      "Abort",
      "Network request failed",
      /Bad status on response/,
      "Operation was cancelled",
      /App hanging/,
      "TypeError: t.fetchNativePackageName"
    ]
  });
}
if (__DEV__ && Platform.OS === "ios") {
  NativeModules.DevSettings.setIsDebuggingRemotely(false);
}
// not using CodePush for development
const CodePushApp = __DEV__
  ? App
  : CodePush({
      // installMode: CodePush.InstallMode.IMMEDIATE
      checkFrequency: CodePush.CheckFrequency.MANUAL
    })(App);

AppRegistry.registerComponent(appName, () => CodePushApp);
