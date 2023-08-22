import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { registerModal } from '@src/modals/base';
import { CardModal } from '@src/modals/card';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import OWIcon from '@src/components/ow-icon/ow-icon';
import { Text } from '@src/components/text';
import OWButtonIcon from '@src/components/button/ow-button-icon';
import { OWButton } from '@src/components/button';
import { TypeTheme, useTheme } from '@src/themes/theme-provider';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { metrics } from '@src/themes';

export const SlippageModal = registerModal(({ close }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = styling(colors);
  return (
    <ScrollView
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}
    >
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.title} size={16} weight="500">
            Slippage tolerance
          </Text>
          <Text style={styles.des} color={colors['blue-300']}>
            {`Your transaction will be suspended \nif the price exceeds the slippage percentage.`}
          </Text>
          <View style={styles.containerInputSlippage}>
            <View style={styles.subContainerInputSlippage}>
              <OWButtonIcon
                colorIcon="#AEAEB2"
                name="minus"
                sizeIcon={20}
                style={styles.minusBtn}
                fullWidth={false}
              />
              <View style={styles.inputWrap}>
                <BottomSheetTextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  defaultValue="0"
                  textAlign="right"
                  placeholderTextColor={colors['text-place-holder']}
                />
                <Text size={18} color={colors['text-value-input-modal']}>
                  %
                </Text>
              </View>
              <OWButtonIcon
                style={styles.addBtn}
                colorIcon="#AEAEB2"
                name="add_ic"
                sizeIcon={20}
                fullWidth={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.containerSlippagePercent}>
          {[1, 3, 5].map((item, index) => {
            return (
              <OWButton
                key={item}
                size="medium"
                style={styles.btnSlippgaePercentInActive}
                textStyle={styles.txtSlippgaePercentInActive}
                label={`${item}%`}
                fullWidth={false}
              />
            );
          })}
          <OWButton
            // key={item}
            size="medium"
            style={styles.btnSlippgaePercentActive}
            textStyle={styles.txtSlippgaePercentActive}
            label={'7%'}
            fullWidth={false}
          />
        </View>
        <OWButton
          style={styles.confirmBtn}
          isBottomSheet
          textStyle={styles.txtBtn}
          type="tonner"
          label="Confirm"
          size="medium"
          onPress={() => {
            setTimeout(() => {
              close();
            }, 100);
          }}
        />
      </View>
    </ScrollView>
  );
});

const styling = (colors: TypeTheme['colors']) =>
  StyleSheet.create({
    txtBtn: {
      fontWeight: '700',
      fontSize: 16
    },
    confirmBtn: {
      marginVertical: 10
    },
    txtSlippgaePercentInActive: {
      color: '#7C8397'
    },
    btnSlippgaePercentInActive: {
      width: metrics.screenWidth / 4 - 20,
      backgroundColor: colors['background-item-list'],
      height: 40
    },
    txtSlippgaePercentActive: {
      color: colors['purple-700']
    },
    btnSlippgaePercentActive: {
      width: metrics.screenWidth / 4 - 20,
      backgroundColor: colors['background-item-list'],
      height: 40,
      borderWidth: 1,
      borderColor: colors['purple-700']
    },
    containerSlippagePercent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      width: '100%'
    },
    addBtn: {
      width: 60
    },
    input: {
      fontSize: 18,
      width: 30,
      color: colors['text-value-input-modal'],
      paddingVertical: 0
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    minusBtn: {
      width: 60
    },
    subContainerInputSlippage: {
      height: 40,
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: colors['border-input-slippage'],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10
    },
    containerInputSlippage: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center'
    },
    des: {
      textAlign: 'center',
      paddingVertical: 10
    },
    title: {
      paddingVertical: 10
    },
    containerTitle: {
      alignItems: 'center'
    },
    container: {
      paddingHorizontal: 24
    }
  });