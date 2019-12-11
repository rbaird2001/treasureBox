import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import {grid} from "../../components/SearchRow/helpers"
import {useParams} from "react-router-dom";

export default () => {
  const {name = "Final Fantasy"} = useParams();
  console.log(name)

  const [games, setGames] = useState([]);
  //const history = useHistory();
  useEffect(() => {
    api.get(`/games/${name}`).then(result => {
      setGames(result.data);
      
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
