import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Container from "../Container/Container";
import LoginModal from "../auth/LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";

import styles from "./Header.module.css";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
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

            {user ? (
              <div className={styles.userMenu}>
                <button className={styles.userBtn}>
                  👤 {user.firstName || user.mobile}
                </button>

                <div className={styles.dropdown}>
                  <Link href="/profile">پروفایل</Link>

                  <Link href="/my-tours">تورهای من</Link>

                  <Link href="/basket">سبد خرید</Link>

                  <button onClick={logout}>خروج</button>
                </div>
              </div>
            ) : (
              <button
                className={styles.loginBtn}
                onClick={() => setShowModal(true)}
              >
                ورود | ثبت نام
              </button>
            )}
          </div>
        </Container>
      </header>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
