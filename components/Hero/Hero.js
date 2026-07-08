import Image from "next/image";
import Container from "../Container/Container";
import SearchBox from "../SearchBox/SearchBox";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1>
              <span>تورینو</span>
              <br />
              برگزار کننده بهترین تورهای داخلی و خارجی
            </h1>

            <p>تجربه‌ای متفاوت از سفر با بهترین قیمت و خدمات</p>
          </div>

          <div className={styles.image}>
            <Image
              src="/images/baner.png"
              alt="Hero"
              width={520}
              height={420}
              priority
            />
          </div>
        </div>

        <SearchBox />
      </Container>
    </section>
  );
}
