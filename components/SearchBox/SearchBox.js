import { useEffect, useState } from "react";
import useTours from "../../hooks/useTours";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const { tours } = useTours();

  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (!tours.length) return;

    setOrigins(
      [...new Map(tours.map(item => [item.origin.id, item.origin])).values()]
    );

    setDestinations(
      [...new Map(tours.map(item => [item.destination.id, item.destination])).values()]
    );
  }, [tours]);

  return (
    <div className={styles.box}>
      <select
        value={originId}
        onChange={(e) => setOriginId(e.target.value)}
      >
        <option value="">مبدا</option>

        {origins.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={destinationId}
        onChange={(e) => setDestinationId(e.target.value)}
      >
        <option value="">مقصد</option>

        {destinations.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <button>جستجو</button>
    </div>
  );
}