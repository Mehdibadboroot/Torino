import api from "./api";

export const sendOtp = (mobile) => {
  return api.post("/auth/send-otp", {
    mobile,
  });
};

export const checkOtp = (mobile, code) => {
  return api.post("/auth/check-otp", {
    mobile,
    code,
  });
};