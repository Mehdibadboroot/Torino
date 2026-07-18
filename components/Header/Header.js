import Image from "next/image";
import Link from "next/link";

import Container from "../Container/Container";
import LoginModal from "../auth/LoginModal/LoginModal";

import { useState, useEffect } from "react";

import { sendOtp, checkOtp } from "../../services/auth";

import { useAuth } from "../../context/AuthContext";

import styles from "./Header.module.css";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const [mobile, setMobile] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState(60);

  const [menuOpen, setMenuOpen] = useState(false);

  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (step !== 2) return;

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  const sendOtpHandler = async () => {
    if (mobile.length !== 11) {
      alert("شماره موبایل معتبر نیست");
      return;
    }

    try {
      await sendOtp(mobile);

      setStep(2);

      setTimer(60);

      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      alert(err.response?.data?.message || "خطا");
    }
  };

  const checkOtpHandler = async () => {
    try {
      const code = otp.join("");

      const { data } = await checkOtp(mobile, code);

      login(data);

      setShowModal(false);

      setStep(1);

      setMobile("");

      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      alert(err.response?.data?.message || "کد اشتباه است");
    }
  };

  const closeModal = () => {
    setShowModal(false);

    setStep(1);

    setMobile("");

    setOtp(["", "", "", "", "", ""]);

    setTimer(90);
  };

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logo.svg"
                alt="Torino"
                width={146}
                height={44}
                priority
              />
            </Link>

            <nav className={styles.nav}>
              <Link href="/" className={styles.active}>
                صفحه اصلی
              </Link>

              <Link href="/">خدمات گردشگری</Link>

              <Link href="/">درباره ما</Link>

              <Link href="/">تماس با ما</Link>
            </nav>

            <div className={styles.mobileActions}>
              {user ? (
                <div className={styles.userMenu}>
                  <button className={styles.userBtn}>
                    👤 {user.firstName} {user.lastName}
                  </button>

                  <div className={styles.dropdown}>
                    <Link href="/profile">پروفایل</Link>

                    <Link href="/my-tours">تورهای من</Link>

                    <Link href="/transactions">تراکنش‌ها</Link>

                    <Link href="/basket">سبد خرید</Link>

                    <button onClick={logout}>خروج از حساب کاربری</button>
                  </div>
                </div>
              ) : (
                <button
                  className={styles.loginBtn}
                  onClick={() => setShowModal(true)}
                >
                  ورود
                </button>
              )}
            </div>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/">صفحه اصلی</Link>

          <Link href="/">خدمات گردشگری</Link>

          <Link href="/">درباره ما</Link>

          <Link href="/">تماس با ما</Link>
        </div>
      )}

      {showModal && (
        <LoginModal
          step={step}
          mobile={mobile}
          setMobile={setMobile}
          otp={otp}
          setOtp={setOtp}
          timer={timer}
          sendOtpHandler={sendOtpHandler}
          checkOtpHandler={checkOtpHandler}
          backHandler={() => setStep(1)}
          closeHandler={closeModal}
        />
      )}
    </>
  );
}
