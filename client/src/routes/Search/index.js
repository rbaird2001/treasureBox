import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
//import GameCard from "../../components/GameCard";
import {grid} from "../../components/SearchRow/helpers"
import {useParams, useHistory} from "react-router-dom";

export default () => {
  const {name = "Final Fantasy"} = useParams();
  console.log(name)

  const [games, setGames] = useState([]);
  //const history = useHistory();
  useEffect(() => {
    api.get(`/games/${name}`).then(result => {
      setGames(result.data);
      // setTimeout(() => {
      //   history.push('/about')
      // }, 10000)
    });
  }, [name]);

  const searchList = grid(games, true)
  return <Fragment>
      {searchList}
      </Fragment>;
//   return (
//     <div>
//       <GameCard />
//     </div>
};
