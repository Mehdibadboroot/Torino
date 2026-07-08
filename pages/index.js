import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero/Hero";
import TourList from "../components/TourList/TourList";
import useTours from "../hooks/useTours";

export default function Home() {
  const { tours, loading } = useTours();

  return (
    <MainLayout>
      <Hero />

      {!loading && <TourList tours={tours} />}
    </MainLayout>
  );
}
