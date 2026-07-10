import { useState } from "react";
import styles from "./LoginModal.module.css";

import { IoClose } from "react-icons/io5";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function LoginModal({
  step,
  mobile,
  setMobile,
  otp,
  setOtp,
  timer,
  sendOtpHandler,
  checkOtpHandler,
  backHandler,
  closeHandler,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {step === 1 ? (
          <>
            <button className={styles.close} onClick={closeHandler}>
              <IoClose />
            </button>

            <h2>ورود به تورینو</h2>

            <p className={styles.label}>شماره موبایل خود را وارد کنید</p>

            <input
              className={styles.input}
              type="tel"
              placeholder="0912***2452"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button className={styles.submit} onClick={sendOtpHandler}>
              ارسال کد تایید
            </button>
          </>
        ) : (
          <>
            <button className={styles.back} onClick={backHandler}>
              <HiOutlineArrowRight />
            </button>

            <h2>کد تایید را وارد کنید.</h2>

            <p className={styles.desc}>
              کد تایید به شماره
              <span>{mobile}</span>
              ارسال شد
            </p>

            <div className={styles.otpWrapper}>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <input
                  key={item}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  className={styles.otp}
                  value={otp[item]}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    const copy = [...otp];

                    copy[item] = value;

                    setOtp(copy);

                    if (value && e.target.nextElementSibling) {
                      e.target.nextElementSibling.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !otp[item] &&
                      e.target.previousElementSibling
                    ) {
                      e.target.previousElementSibling.focus();
                    }
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData
                      .getData("text")
                      .replace(/\D/g, "");

                    if (paste.length === 6) {
                      setOtp(paste.split(""));
                    }

                    e.preventDefault();
                  }}
                />
              ))}
            </div>

            <p className={styles.timer}>
              {timer > 0 ? (
                <>
                  ارسال مجدد کد تا
                  <span>
                    {" "}
                    01:
                    {timer.toString().padStart(2, "0")}
                  </span>
                </>
              ) : (
                <button className={styles.resend} onClick={sendOtpHandler}>
                  ارسال مجدد کد
                </button>
              )}
            </p>
            <button
              className={styles.submit}
              disabled={otp.join("").length !== 6}
              onClick={checkOtpHandler}
            >
              ورود به تورینو
            </button>
          </>
        )}
      </div>
    </div>
  );
}
