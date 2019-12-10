import React, {useEffect} from 'react';
import './App.css';
import Search from './routes/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Route path="/search/:name?">
            <Search />
        </Route>
        <Route path="/about"><h1>ABOUT</h1></Route>
        </Switch>
    </Router>
  );
}

export default App;
