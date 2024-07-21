import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import useHeaderOptions from "@src/hooks/use-header";
import { SCREENS, SCREENS_OPTIONS } from "@src/common/constants";
import { SendScreen } from "@src/screens/send";
import { SendEvmScreen } from "@src/screens/send/send-evm";
import { CameraScreen } from "@src/screens/camera";
import { SelectNetworkScreen } from "@src/screens/network";
import {
  ValidatorDetailsScreen,
  ValidatorListScreen,
} from "@src/screens/stake";
import {
  TxFailedResultScreen,
  TxPendingResultScreen,
  TxSuccessResultScreen,
} from "@src/screens/tx-result";
import { SendTronScreen } from "@src/screens/send/send-tron";
import { AddTokenScreen } from "@src/screens/network/add-token";
import { SendBtcScreen } from "@src/screens/send/send-btc";
import BuyFiat from "@src/screens/home/buy-fiat";
import { NewSendScreen } from "@src/screens/send/send";
import { AddressQRScreen } from "@src/screens/qr";
import { PincodeScreen } from "@src/screens/pincode/pincode";
import TxTransactionsScreen from "@src/screens/transactions/tx-transaction-screen";
import { HistoryDetail } from "@src/screens/transactions/history-detail";

const Stack = createStackNavigator();
export const OtherNavigation: FC = () => {
  const handleScreenOptions = ({ route, navigation }) => {
    const headerOptions = useHeaderOptions(
      { title: SCREENS_OPTIONS[route?.name].title },
      navigation
    );
    return headerOptions;
  };
  return (
    <Stack.Navigator screenOptions={handleScreenOptions}>
      <Stack.Screen name={SCREENS.Send} component={SendScreen} />
      <Stack.Screen name={SCREENS.PincodeScreen} component={PincodeScreen} />

      {/*<Stack.Screen name={SCREENS.NewSend} component={NewSendScreen} />*/}
      <Stack.Screen name={SCREENS.NewSend} component={NewSendScreen} />
      <Stack.Screen name={SCREENS.SendEvm} component={SendEvmScreen} />
      <Stack.Screen name={SCREENS.SendOasis} component={SendEvmScreen} />
      <Stack.Screen
        name={SCREENS.Transactions}
        component={TxTransactionsScreen}
      />
      <Stack.Screen name={SCREENS.HistoryDetail} component={HistoryDetail} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.Camera}
        component={CameraScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.QRScreen}
        component={AddressQRScreen}
      />

      <Stack.Screen
        name={SCREENS.NetworkSelect}
        component={SelectNetworkScreen}
      />
      <Stack.Screen name={SCREENS.NetworkToken} component={AddTokenScreen} />
      <Stack.Screen
        name={SCREENS.ValidatorDetails}
        component={ValidatorDetailsScreen}
      />
      <Stack.Screen
        name={SCREENS.ValidatorList}
        component={ValidatorListScreen}
      />

      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name={SCREENS.TxPendingResult}
        component={TxPendingResultScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name={SCREENS.TxSuccessResult}
        component={TxSuccessResultScreen}
      />
      <Stack.Screen name={SCREENS.BuyFiat} component={BuyFiat} />
      <Stack.Screen name={SCREENS.SendTron} component={SendTronScreen} />
      <Stack.Screen name={SCREENS.SendBtc} component={SendBtcScreen} />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name={SCREENS.TxFailedResult}
        component={TxFailedResultScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
