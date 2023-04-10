import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useStyle } from '@src/styles';
import { useTheme } from '@src/themes/theme-provider';
import { useStore } from '@src/stores';
import {
  BlurredHeaderScreenOptionsPreset,
  getPlainHeaderScreenOptionsPresetWithBackgroundColor,
  HeaderRightButton,
  PlainHeaderScreenOptionsPreset
} from '@src/components/header';
import { SCREENS, SCREENS_TITLE } from '@src/common/constants';
import { SettingScreen } from '@src/screens/setting';
import { OWalletVersionScreen } from '@src/screens/setting/screens/version';
import { ViewPrivateDataScreen } from '@src/screens/setting/screens/view-private-data';
import { SettingSelectAccountScreen } from '@src/screens/setting/screens/select-account';
import { HeaderAddIcon } from '@src/components/header/icon';
import useHeaderOptions from '@src/hooks/use-header';
const Stack = createStackNavigator();
export const SettingStackScreen: FC = () => {
  const style = useStyle();

  const navigation = useNavigation();

  const { colors } = useTheme();

  const { analyticsStore } = useStore();
  const handleScreenOptions = ({ route, navigation }) => {
    const headerOptions = useHeaderOptions(
      { title: SCREENS_TITLE[route?.name] },
      navigation
    );
    return headerOptions;
  };
  return (
    <Stack.Navigator screenOptions={handleScreenOptions} headerMode="screen">
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Settings',
          ...getPlainHeaderScreenOptionsPresetWithBackgroundColor(
            style.get('color-setting-screen-background').color
          ),
          headerTitleStyle: style.flatten(['h3', 'color-text-black-high'])
        }}
        name={SCREENS.Setting}
        component={SettingScreen}
      />
      <Stack.Screen
        name={SCREENS.SettingSelectAccount}
        options={{
          headerRight: () => (
            <HeaderRightButton
              onPress={() => {
                analyticsStore.logEvent('Add additional account started');
                navigation.navigate('Register', {
                  screen: 'Register.Intro'
                });
              }}
            >
              <HeaderAddIcon />
            </HeaderRightButton>
          )
          //   ...BlurredHeaderScreenOptionsPreset,
          //   headerStyle: {
          //     backgroundColor: colors['primary'],
          //     shadowColor: 'transparent', // this covers iOS
          //     elevation: 0 // this covers Android
          //   }
        }}
        component={SettingSelectAccountScreen}
      />

      <Stack.Screen
        name={SCREENS.SettingViewPrivateData}
        component={ViewPrivateDataScreen}
      />
      <Stack.Screen
        name={SCREENS.SettingVersion}
        component={OWalletVersionScreen}
      />
    </Stack.Navigator>
  );
};
