import React from "react";

import classnames from "classnames";
import styles from "./index.module.scss";

export type ButtonType = "primary" | "danger" | null;

export function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
}) {
  return (
    <button
      className={classnames(
        styles["icon-button"],
        props.bordered && styles.border,
        props.shadow && styles.shadow,
        props.className,
        "clickable",
        styles[props.type ?? ""],
      )}
    >
      {props.icon && (
        <div
          className={classnames(
            styles["icon-button-icon"],
            props.type === "primary" && "no-dark",
          )}
        >
          {props.icon}
        </div>
      )}

      {props.text && (
        <div className={styles["icon-button-text"]}>{props.text}</div>
      )}
    </button>
  );
}
