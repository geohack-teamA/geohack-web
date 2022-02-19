import React from 'react';
import Form from './Form';
import useHooks from './hooks';
import Result from './Result';

export type Props = {
  className?: string;
};

const Home: React.FC<Props> = ({ className }) => {
  const {
    handleGeoLocationGet,
    handleSubmit,
    currentLocation,
    mode,
    resData,
    loading,
  } = useHooks();
  return mode === `form` ? (
    <Form
      onGeoLocationGet={handleGeoLocationGet}
      onSubmit={handleSubmit}
      currentLocation={currentLocation}
      loading={loading}
    />
  ) : (
    <Result data={resData} />
  );
};

export default Home;
