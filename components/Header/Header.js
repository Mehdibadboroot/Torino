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
            <div className={styles.logo}>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Torino"
                  width={146}
                  height={44}
                  priority
                />
              </Link>
            </div>

            <nav className={styles.nav}>
              <Link href="/" className={styles.active}>
                صفحه اصلی
              </Link>

              <Link href="/tours">خدمات گردشگری</Link>

              <Link href="/about">درباره ما</Link>

              <Link href="/contact">تماس با ما</Link>
            </nav>

            {user ? (
              <div className={styles.userBox}>
                <span>{user.mobile}</span>

                <button
                  className={styles.logoutBtn}
                  onClick={logout}
                >
                  خروج
                </button>
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

      {showModal && (
        <LoginModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}