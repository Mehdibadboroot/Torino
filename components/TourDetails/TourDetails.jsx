import Image from "next/image";
import styles from "./TourDetails.module.css";

import { HiOutlineLocationMarker, HiOutlineUsers } from "react-icons/hi";

import { FiCalendar, FiShield } from "react-icons/fi";

import { FaBus, FaCheckCircle } from "react-icons/fa";

import { addToBasket } from "../../services/basket";

export default function TourDetails({ tour }) {
  const start = new Date(tour.startDate).toLocaleDateString("fa-IR");

  const end = new Date(tour.endDate).toLocaleDateString("fa-IR");

  const days = Math.ceil(
    (new Date(tour.endDate) - new Date(tour.startDate)) / (1000 * 60 * 60 * 24),
  );

  const reserveHandler = async () => {
    try {
      const { data } = await addToBasket(tour.id);

      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.imageBox}>
          <Image
            src={tour.image}
            alt={tour.title}
            width={520}
            height={420}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.content}>
          <h1>{tour.title}</h1>

          <p className={styles.duration}>
            {days} روز و {days - 1} شب
          </p>

          <div className={styles.options}>
            <div>
              <FaCheckCircle />
              <span>تورلیدر از مبدا</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>برنامه سفر</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>تضمین کیفیت</span>
            </div>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.price}>
              <span>{Number(tour.price).toLocaleString("fa-IR")}</span>
              <small>تومان</small>
            </div>

            <button className={styles.reserveBtn} onClick={reserveHandler}>
              رزرو و خرید
            </button>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.item}>
          <HiOutlineLocationMarker />

          <div>
            <span>مبدا</span>
            <strong>{tour.origin.name}</strong>
          </div>
        </div>

        <div className={styles.item}>
          <FiCalendar />

          <div>
            <span>تاریخ رفت</span>
            <strong>{start}</strong>
          </div>
        </div>

        <div className={styles.item}>
          <FiCalendar />

          <div>
            <span>تاریخ برگشت</span>
            <strong>{end}</strong>
          </div>
        </div>

        <div className={styles.item}>
          <FaBus />

          <div>
            <span>حمل و نقل </span>
            <strong>{tour.fleetVehicle}</strong>
          </div>
        </div>

        <div className={styles.item}>
          <HiOutlineUsers />

          <div>
            <span>ظرفیت</span>
            <strong>
              {tour.availableSeats} / {tour.capacity}
            </strong>
          </div>
        </div>

        <div className={styles.item}>
          <FiShield />

          <div>
            <span>بیمه</span>
            <strong>{tour.insurance ? "دارد" : "ندارد"}</strong>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <h2>امکانات تور</h2>

        <div className={styles.optionGrid}>
          {tour.options?.map((item, index) => (
            <div key={index} className={styles.option}>
              <FaCheckCircle />

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
