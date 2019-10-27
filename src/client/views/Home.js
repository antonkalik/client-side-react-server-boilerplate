import React, { useEffect } from 'react';
import axios from 'axios';
import { Header, Content, Footer } from '../components';

export default function Home() {
  useEffect(() => {
    axios
      .get('/api/test')
      .then(response => {
        console.log({ response });
      })
      .catch(error => {
        console.log({ error });
      });
  }, []);
  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
