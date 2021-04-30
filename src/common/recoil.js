import { atom } from "recoil";

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
