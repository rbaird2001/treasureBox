import React from 'react';
import './App.css';
import Search from './routes/Search';
import Shelf from './routes/Shelf'
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
          <Redirect to="/shelf" />
        </Route>
        <Route path="/search/:name?">
            <Search />
        </Route>
        <Route path="/about"><h1>ABOUT</h1></Route>
        <Route path="/shelf"><Shelf /></Route>
        </Switch>
    </Router>
  );
}

export default App;
