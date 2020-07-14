import React, { useEffect, useState } from 'react';
import { Header, Content } from '../components';

let intervalId;

export default function Home() {
  const [isOpen, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      intervalId = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen, intervalId]);

  console.log(count);

  return (
    <div className="home">
      <Header />
      <Content />

      <button onClick={() => setOpen(!isOpen)}>Click me</button>
      <span> </span>
      <label>{isOpen ? 'On' : 'Off'}</label>
      <div>
        <h1>Timer from useEffect:</h1>
        {Array(count)
          .fill('*')
          .map((it, i) => (
            <p key={i}>{i}</p>
          ))}
      </div>
    </div>
  );
}
