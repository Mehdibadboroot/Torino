import Image from "next/image";
import Link from "next/link";

import styles from "./TourCard.module.css";

export default function TourCard({ tour }) {
  const start = new Date(tour.startDate);

  return (
    <div className={styles.card}>
      <Link href={`/tour/${tour.id}`}>
        <Image
          src={tour.image}
          alt={tour.title}
          width={320}
          height={200}
          className={styles.image}
        />
      </Link>

      <div className={styles.body}>
        <h3>{tour.title}</h3>

        <p className={styles.info}>
          {start.getMonth() + 1} مهر •{" "}
          {Math.ceil(
            (new Date(tour.endDate) - new Date(tour.startDate)) /
              (1000 * 60 * 60 * 24),
          )}{" "}
          روزه • {tour.fleetVehicle} • هتل ۳ ستاره
        </p>
      </div>

      <div className={styles.footer}>
        <Link href={`/tour/${tour.id}`} className={styles.btn}>
          رزرو
        </Link>

        <div className={styles.price}>
          <small>تومان</small>
          <span>{tour.price.toLocaleString("fa-IR")}</span>
        </div>
      </div>
    </div>
  );
}
