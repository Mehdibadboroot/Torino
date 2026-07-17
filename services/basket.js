import api from "./api";

export const getBasket = async () => {
  try {
    const res = await api.get("/basket");

    return res;
  } catch (err) {
    if (err.response?.status === 404) {
      return {
        data: null,
      };
    }

    throw err;
  }
};

export const addToBasket = (tourId) => api.put(`/basket/${tourId}`);
