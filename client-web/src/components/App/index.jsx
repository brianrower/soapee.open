import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Calculator from 'components/App/Calculator';
import Recipes from 'components/App/Recipes';
import PageNotFound from 'components/App/PageNotFound';

import useGaRouteLogging from 'hooks/useGaRouteLogging';

import Footer from './components/Footer';
import NavBar from './components/NavBar';

import './App.styl';

export default function App() {
  useGaRouteLogging();

  return (
    <div id="root-app">
      <Helmet
        title="Soapee"
      />

      <NavBar />

      <div className="App">
        <Switch>
          <Route path="/calculator"><Calculator /></Route>
          <Route path="/recipes"><Recipes /></Route>
          <Route exact path="/"><Redirect to="/calculator" /></Route>

          <Route><PageNotFound /></Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
}
