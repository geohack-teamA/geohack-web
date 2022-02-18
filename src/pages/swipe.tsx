import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Swipe: NextPage = () => {
  const SwipeComp = dynamic(() => import(`@geohack/components/pages/Swipe`), {
    ssr: false,
  });
  return <SwipeComp />;
};

export default Swipe;
