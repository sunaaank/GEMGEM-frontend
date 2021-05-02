import { f7, theme } from "framework7-react";

export const toast = (text) => {
  let toastIcon;
  if (!toastIcon) {
    toastIcon = f7.toast.create({
      icon:
        theme.ios || theme.aurora
          ? '<i class="f7-icons">checkmark_circle_fill</i>'
          : '<i class="material-icons">CheckCircle</i>',
      text: text,
      position: "center",
      closeTimeout: 1400,
    });
  }
  toastIcon.open();
};

export const sleep = (ms) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};
