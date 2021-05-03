import { atom, selector } from "recoil";

// User
export const userDataState = atom({
  key: "userDataState",
  default: { name: "", phone: "", email: "" },
});

// Item
export const packageOptionState = atom({
  key: "packageOptionState",
  default: "베이직",
});

export const rentDateState = atom({
  key: "rentDateState",
  default: { startDate: "", endDate: "" },
});

export const rentPeriodState = atom({
  key: "rentPeriodState",
  default: "0",
});

export const itemTotalPriceState = atom({
  key: "itemTotalPriceState",
  default: "0",
});

export const itemsDataState = atom({
  key: "itemsDataState",
  default: [],
});

// Cart
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

//Order
export const orderDataState = atom({
  key: "orderDataState",
  default: [],
});
