import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import { grid } from "../../components/SearchRow/helpers";
import SearchBar from '../../components/SearchBar'
import Navbar from '../../components/NavBar/Navbar'

export default () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    api.get("/shelf/").then(result => {
      setGames(result.data);
    });
  }, []);
  const gameShelf = grid(games);

  return (
    <Fragment>
        <Navbar />
        <SearchBar />
        {gameShelf}
    </Fragment>
  );
};
