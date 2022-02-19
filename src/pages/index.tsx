import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  const HomePage = dynamic(() => import(`@geohack/components/pages/Home`), {
    ssr: false,
  });
  return <HomePage />;
};

export default Home;
