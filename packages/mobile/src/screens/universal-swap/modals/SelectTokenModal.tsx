import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import React, { FunctionComponent, useRef } from 'react';
import { registerModal } from '@src/modals/base';
import images from '@src/assets/images';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OWFlatList from '@src/components/page/ow-flat-list';
import OWIcon from '@src/components/ow-icon/ow-icon';
import { Text } from '@src/components/text';

import { TypeTheme, useTheme } from '@src/themes/theme-provider';
import { metrics } from '@src/themes';
import { OWButton } from '@src/components/button';
import { TokenInfo } from '../types';

export const SelectTokenModal: FunctionComponent<{
  onNetworkModal?: () => void;
  close?: () => void;
  data: TokenInfo[];
  isOpen?: boolean;
  onActiveToken: (token: TokenInfo) => void;
  bottomSheetModalConfig?: unknown;
}> = registerModal(({ close, onNetworkModal, data, onActiveToken }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = styling(colors);
  return (
    <View
      style={[styles.containerModal, { paddingBottom: safeAreaInsets.bottom }]}
    >
      <View>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors['text-place-holder']}
          placeholder="Search Token"
        />
        <View style={styles.iconSearch}>
          <OWIcon color={colors['blue-400']} text name="search" size={16} />
        </View>
      </View>

      <View style={styles.containerTitle}>
        <Text color={colors['blue-400']} weight="500">
          List Token
        </Text>
        <TouchableOpacity
          onPress={() => {
            onNetworkModal();
          }}
          style={styles.btnNetwork}
        >
          <OWIcon type="images" source={images.push} size={16} />
          <Text
            style={styles.txtNetwork}
            color={colors['blue-400']}
            weight="500"
          >
            Network
          </Text>
          <OWIcon size={16} color={colors['blue-400']} name="down" />
        </TouchableOpacity>
      </View>
      <OWFlatList
        isBottomSheet
        keyboardShouldPersistTaps="handled"
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                close();
                onActiveToken(item);
              }}
              style={styles.btnItem}
            >
              <View style={styles.leftBoxItem}>
                <OWIcon type="images" source={item?.logo} size={35} />
                <View style={styles.pl10}>
                  <Text size={16} color={colors['text-title']} weight="500">
                    {item?.symbol}
                  </Text>
                  <Text weight="500" color={colors['blue-400']}>
                    {item?.network}
                  </Text>
                </View>
              </View>
              <Text color={colors['text-title']}>{item?.available}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

const styling = (colors: TypeTheme['colors']) =>
  StyleSheet.create({
    pl10: {
      paddingLeft: 10
    },
    leftBoxItem: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    btnItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },
    txtNetwork: {
      paddingHorizontal: 4
    },
    btnNetwork: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    containerTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10
    },
    iconSearch: {
      position: 'absolute',
      left: 12,
      top: 22
    },
    textInput: {
      paddingVertical: 0,
      height: 40,
      backgroundColor: colors['box-nft'],
      borderRadius: 8,
      paddingLeft: 35,
      fontSize: 16,
      color: colors['text-title'],
      marginVertical: 10
    },
    containerModal: {
      paddingHorizontal: 24,

      height: metrics.screenHeight
    }
  });