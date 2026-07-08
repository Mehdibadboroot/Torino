import TourCard from "../TourCard/TourCard";

export default function TourList({ tours }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
