import {
  EmptyAmountError,
  IAmountConfig,
  InsufficientAmountError,
  InvalidNumberAmountError,
  NegativeAmountError,
  ZeroAmountError,
} from "@owallet/hooks";
import { observer } from "mobx-react-lite";
import React, { FunctionComponent, useMemo } from "react";
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native";
import OWText from "../text/ow-text";
import { TextInput } from "./input";

export const NewAmountInput: FunctionComponent<{
  labelStyle?: TextStyle;
  colors: any;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  errorLabelStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  allowMax?: boolean;
  manually?: boolean;
  maxBalance?: string;
  amountConfig: IAmountConfig;
}> = observer(
  ({
    labelStyle,
    containerStyle,
    inputContainerStyle,
    errorLabelStyle,
    amountConfig,
    placeholder,
    placeholderTextColor,
    manually = false,
    maxBalance,
    colors,
  }) => {
    const error = amountConfig.getError();
    const errorText: string | undefined = useMemo(() => {
      if (error) {
        switch (error.constructor) {
          case EmptyAmountError:
            return;
          case InvalidNumberAmountError:
            return "Invalid number";
          case ZeroAmountError:
            return "Amount is zero";
          case NegativeAmountError:
            return "Amount is negative";
          case InsufficientAmountError:
            return "Insufficient fund";
          default:
            return "Unknown error";
        }
      }
    }, [error]);

    return (
      <View style={{ marginBottom: errorText ? 24 : 0 }}>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors["primary-surface-default"],
              borderRadius: 999,
              paddingHorizontal: 12,
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 4,
            }}
            onPress={() => {
              if (!manually) {
                amountConfig.setFraction(0.5);
              } else {
                if (maxBalance)
                  amountConfig.setAmount(
                    (Number(maxBalance) / 2).toString().replace(/,/g, ".")
                  );
              }
            }}
          >
            <OWText
              color={colors["neutral-text-action-on-dark-bg"]}
              weight="600"
              size={14}
            >
              50%
            </OWText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors["primary-surface-default"],
              borderRadius: 999,
              paddingHorizontal: 12,
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 4,
            }}
            onPress={() => {
              amountConfig.setFraction(1);
              if (!manually) {
                amountConfig.setFraction(1);
              } else {
                if (maxBalance)
                  amountConfig.setAmount(maxBalance.replace(/,/g, "."));
              }
            }}
          >
            <OWText
              color={colors["neutral-text-action-on-dark-bg"]}
              weight="600"
              size={14}
            >
              100%
            </OWText>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            label={""}
            labelStyle={labelStyle}
            containerStyle={containerStyle}
            inputContainerStyle={inputContainerStyle}
            textAlign="right"
            errorLabelStyle={errorLabelStyle}
            value={amountConfig.amount}
            onChangeText={(text) => {
              if (maxBalance) {
                if (Number(maxBalance) >= Number(text.replace(/,/g, "."))) {
                  amountConfig.setAmount(text.replace(/,/g, "."));
                } else {
                  amountConfig.setAmount(maxBalance.replace(/,/g, "."));
                }
              } else {
                amountConfig.setAmount(text.replace(/,/g, "."));
              }
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            error={errorText}
            keyboardType="numeric"
            style={{ fontSize: 24 }}
          />
        </View>
      </View>
    );
  }
);