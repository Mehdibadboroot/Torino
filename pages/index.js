// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// import MainLayout from "../layouts/MainLayout";
// import Hero from "../components/Hero/Hero";
// import TourList from "../components/TourList/TourList";

// import { getTours } from "../services/tours";

// import SearchBox from "../components/SearchBox/SearchBox";
// import TourCard from "../components/TourCard/TourCard";

// import styles from "../styles/Home.module.css";

// export default function Home() {
//   const router = useRouter();

//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!router.isReady) return;

//     loadTours();
//   }, [router.isReady, router.query]);

//   const loadTours = async () => {
//     try {
//       setLoading(true);

//       const { data } = await getTours(router.query);

//       setTours(data);
//     } catch (err) {
//       setTours([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <Hero />

//       {!loading && <TourList tours={tours} />}
//     </MainLayout>
//   );
// }

import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero/Hero";
import SearchBox from "../components/SearchBox/SearchBox";
import TourList from "../components/TourList/TourList";

export default function Home({ tours }) {
  return (
    <MainLayout>
      <Hero />
      <TourList tours={tours} />
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
