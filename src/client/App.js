import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home, About, NotFound } from './views';
import { Navigation, Footer } from './components';

export default function App() {
  return (
    <Router>
      <Navigation />
      <div className="view">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
