import React, { useEffect } from 'react';
import axios from 'axios';

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
  return <div>translations app</div>;
}
