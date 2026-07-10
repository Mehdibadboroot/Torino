import TourCard from "../TourCard/TourCard";
import styles from "./TourList.module.css";

export default function TourList({ tours }) {
  return (
    <section>
      <h2 className={styles.title}>همه تور ها</h2>

      <div className={styles.grid}>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}