import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour }) {
  return (
    <Link
      href={`/tour/${tour.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          width: 320,
          border: "1px solid #ddd",
          borderRadius: 16,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Image
          src={tour.image}
          alt={tour.title}
          width={320}
          height={220}
        />

        <div style={{ padding: 16 }}>
          <h3>{tour.title}</h3>

          <p>
            {tour.origin.name} → {tour.destination.name}
          </p>

          <p>{tour.price.toLocaleString()} تومان</p>

          <p>
            {tour.availableSeats} / {tour.capacity}
          </p>
        </div>
      </div>
    </Link>
  );
}