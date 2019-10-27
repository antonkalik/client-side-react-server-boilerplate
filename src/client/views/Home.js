import React, { useEffect } from 'react';
import { FetchData } from '../api';
import { Header, Content } from '../components';

export default function Home() {
  useEffect(() => {
    FetchData.getLatestData();
  }, []);
  return (
    <div className="home">
      <Header />
      <Content />
    </div>
  );
}
