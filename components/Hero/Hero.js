import Image from "next/image";
import Container from "../Container/Container";
import SearchBox from "../SearchBox/SearchBox";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.banner}>
        <Image src="/images/baner.svg" alt="Hero" fill priority />
      </div>
      <Container>
        <div className={styles.text}>
          <h1>
            <span>تورینو</span>
            برگزار کننده بهترین تور های داخلی و خارجی
          </h1>
        </div>

        <SearchBox />
      </Container>
    </section>
  );
}
