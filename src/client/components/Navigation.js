import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <div className="navigation">
      <NavLink to="/">home</NavLink>
      <NavLink to="/about">about</NavLink>
    </div>
  );
}
