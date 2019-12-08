 import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import GameCard from "../../components/GameCard";

export default ({ name = "borderlands" }) => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    api.get(`/games/${name}`).then(result => {
      setGames(result.data);
    });
  }, [name]);


  const searchList = () => {
      console.log(games);
    return games.map((game) => <GameCard img={game.cover} key={game.id} /> );
  };

  return <Fragment>
      {searchList()}
      </Fragment>;
//   return (
//     <div>
//       <GameCard />
//     </div>
};
