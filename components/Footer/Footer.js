import Image from "next/image";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.line}></div>

      <div className={styles.item}>
        <div className={styles.about}>
          <div>
            <h2>تورینو</h2>
            <h4>درباره ما</h4>
            <h4>تماس با ما</h4>
            <h4>چرا تورینو</h4>
            <h4>بیمه مسافرتی</h4>
          </div>
          <div>
            <h2>خدمات مشتریان</h2>
            <h4> پشتیبانی آنلاین</h4>
            <h4>راهنمای خرید</h4>
            <h4>راهنمای استرداد</h4>
            <h4>پرسش و پاسخ</h4>
          </div>
        </div>
        <div className={styles.support}>
          <div className={styles.logo}>
            <Image
              src="/images/logo.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />
            <h5>تلفن پشتیبانی : 0218574</h5>
          </div>
          <div className={styles.support_item}>
            <Image
              src="/images/home-desktop.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />{" "}
            <Image
              src="/images/hoghogh.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />{" "}
            <Image
              src="/images/etehadie.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />{" "}
            <Image
              src="/images/samandehi.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />{" "}
            <Image
              src="/images/damaneh.svg"
              alt="Torino"
              width={146}
              height={44}
              priority
            />
          </div>
        </div>
      </div>
      <div className={styles.line_end}></div>
      <div className={styles.torino}>
        <h3>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</h3>
        <h4>Developed By Mehdi Badboroot </h4>
      </div>
    </div>
  );
}

export default Footer;
