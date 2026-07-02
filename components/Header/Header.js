import Link from "next/link";
import Container from "../Container/Container";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src="/images/logo.svg" alt="Torino" />
          </div>

          <nav className={styles.nav}>
            <Link href="/">صفحه اصلی</Link>
            <Link href="/">خدمات گردشگری</Link>
            <Link href="/">درباره ما</Link>
            <Link href="/">تماس با ما</Link>
          </nav>

          <button className={styles.login}>
            <span>👤</span>
            ورود | ثبت نام
          </button>
        </div>
      </Container>
    </header>
  );
}