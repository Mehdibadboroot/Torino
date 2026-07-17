
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero/Hero";
import SearchBox from "../components/SearchBox/SearchBox";
import TourList from "../components/TourList/TourList";
import Main from "../components/Main/Main";

export default function Home({ tours }) {
  return (
    <MainLayout>
      <Hero />
      <TourList tours={tours} />
      <Main />
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const params = new URLSearchParams();

  if (query.originId) params.append("originId", query.originId);

  if (query.destinationId) params.append("destinationId", query.destinationId);

  if (query.startDate) params.append("startDate", query.startDate);

  if (query.endDate) params.append("endDate", query.endDate);

  const res = await fetch(`http://localhost:6500/tour?${params.toString()}`);

  const tours = await res.json();

  return {
    props: {
      tours,
    },
  };
}
