import api from "./api";

export const addToBasket = (tourId) =>
  api.put(`/basket/${tourId}`);

export const getBasket = () =>
  api.get("/basket");