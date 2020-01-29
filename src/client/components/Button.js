import React from 'react';

export default function Button({ onClick, type, text }) {
  return (
    <div className="button">
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
