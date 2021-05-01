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

export const cartDataState = atom({
  key: "cartDataState",
  default: [],
});

export const alreadyHasItemState = atom({
  key: "alreadyHasItemState",
  default: false,
});

// export const cartSelector = selector({
//   key: "cartSelector",
//   get:
// });
