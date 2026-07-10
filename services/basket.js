import api from "./api";

export const getBasket = () =>
  api.get("/basket");

export const addToBasket = (tourId) =>
  api.put(`/basket/${tourId}`);