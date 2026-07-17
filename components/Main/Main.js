import styles from "./Main.module.css";
import { FiPhone } from "react-icons/fi";
import Image from "next/image";

function Main() {
  return (
    <div>
      <section className={styles.callSection}>
        <div className={styles.wrapper}>
          <div className={styles.banner}>
            <div className={styles.background}></div>

            <div className={styles.content}>
              <h2>
                خرید تلفنی از <span> تورینو </span>{" "}
              </h2>
              <p>به هرکجا که می‌خواهید!</p>
            </div>

            <Image
              src="/images/operator.svg"
              alt="operator"
              width={308}
              height={225}
              className={styles.operator}
            />
          </div>

          <div className={styles.contactCard}>
            <div className={styles.phoneBox}>
              <span>۰۲۱-۱۸۴۰</span>
              <FiPhone />
            </div>

            <button className={styles.btn}>اطلاعات بیشتر</button>
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.whyWrapper}>
          <div className={styles.whyContent}>
            <div className={styles.titleBox}>
              <div className={styles.question}>؟</div>

              <h2>
                چرا <span>تورینو</span>؟
              </h2>
            </div>

            <h3>تور طبیعت گردی و تاریخی</h3>

            <p>
              اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
              طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید
              تورهای طبیعت گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های
              گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای
              فرهنگی و تاریخی را خریداری کنید.
            </p>
          </div>

          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <div className={styles.img1}>
                <Image src="/images/avatar1.svg" alt="avatar1" fill />
              </div>

              <div className={styles.img2}>
                <Image src="/images/avatar2.svg" alt="avatar2" fill />
              </div>

              <div className={styles.img3}>
                <Image src="/images/avatar3.svg" alt="avatar3" fill />
              </div>

              <div className={styles.img4}>
                <Image src="/images/avatar4.svg" alt="avatar4" fill />
              </div>
            </div>

            <div className={styles.sliderNav}>
              <button type="button">&#8594;</button>

              <span>1 / 4</span>

              <button type="button">&#8592;</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresWrapper}>
          <div className={styles.feature}>
            <Image
              src="/images/Group.svg"
              alt="discount"
              width={100}
              height={100}
            />

            <div>
              <h3>بصرفه ترین قیمت</h3>
              <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <Image
              src="/images/Group17.svg"
              alt="support"
              width={100}
              height={100}
            />

            <div>
              <h3>پشتیبانی</h3>
              <p>پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <Image
              src="/images/Group18.svg"
              alt="heart"
              width={100}
              height={100}
            />

            <div>
              <h3>رضایت کاربران</h3>
              <p>رضایت بیش از ۱۰ هزار کاربر از تورهای ما.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
