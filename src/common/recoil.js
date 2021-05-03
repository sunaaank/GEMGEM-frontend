import { atom, selector } from "recoil";

export const packageOptionState = atom({
  key: "packageOptionState",
  default: "베이직",
});

export const rentDateState = atom({
  key: "rentDateState",
  default: { startDate: "", endDate: "" },
});

export const itemTotalPriceState = atom({
  key: "itemTotalPriceState",
  default: 0,
});

export const itemsDataState = atom({
  key: "itemsDataState",
  default: [],
});

export const cartDataState = atom({
  key: "cartDataState",
  default: [],
});

export const cartTotalPriceState = atom({
  key: "cartTotalPriceState",
  default: 0,
});

export const alreadyHasItemState = atom({
  key: "alreadyHasItemState",
  default: false,
});

export const alreadyHasCartState = atom({
  key: "alreadyHasCartState",
  default: false,
});

export const orderDataState = atom({
  key: "orderDataState",
  default: [],
});
