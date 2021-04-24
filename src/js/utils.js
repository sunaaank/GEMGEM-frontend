export const toast = (text) => {
  let toastBox;
  if (!toastBox) {
    toastBox = f7.toast.create({
      text: text,
      position: "center",
      closeTimeout: 400,
    });
  }
  toastBox.open();
};

export const sleep = (ms) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};
