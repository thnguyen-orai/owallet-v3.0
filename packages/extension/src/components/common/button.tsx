import React, { FunctionComponent, CSSProperties, ReactElement } from "react";
import colors from "../../theme/colors";

import style from "./style.module.scss";

export const Button: FunctionComponent<{
  buttonType?: string;
  color?: "primary" | "secondary" | "danger" | "reject";
  size?: "default" | "small" | "large";
  mode?: "fill" | "light" | "outline" | "text";
  text?: string | ReactElement;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e) => void;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  rippleColor?: string;
  underlayColor?: string;
  className?: string;
  type?: "button" | "reset" | "submit";
}> = ({
  color = "primary",
  size = "default",
  mode = "fill",
  text,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  onClick,
  containerStyle,
  className,
  ...props
}) => {
  const buttonType = (() => {
    switch (color) {
      case "primary":
        return style.primaryBtn;
      case "secondary":
        return style.secondaryBtn;
      case "danger":
        return style.dangerBtn;
      case "reject":
        return style.rejectBtn;
      default:
        return style.primaryBtn;
    }
  })();

  const buttonMode = (() => {
    switch (mode) {
      case "fill":
        return style.buttonFill;
      case "outline":
        return style.buttonOutline;
      default:
        return style.buttonFill;
    }
  })();

  const buttonSize = (() => {
    switch (size) {
      case "small":
        return style.buttonSmall;
      case "large":
        return style.buttonLarge;
      default:
        return style.buttonDefault;
    }
  })();

  const disabledBtn = (() => {
    if (disabled) {
      return {
        backgroundColor: colors["neutral-icon-disable"],
        color: colors["neutral-text-action-on-dark-bg"],
        cursor: "not-allowed",
      };
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        style.button,
        buttonType,
        buttonMode,
        buttonSize,
        disabledBtn,
      ].join(" ")}
      style={{ ...containerStyle, ...disabledBtn }}
    >
      {loading ? <i className="fa fa-spinner fa-spin"></i> : null}
      {leftIcon ? <div>{leftIcon}</div> : null}
      {text ?? props.children}
      {rightIcon ? <div>{rightIcon}</div> : null}
    </button>
  );
};
