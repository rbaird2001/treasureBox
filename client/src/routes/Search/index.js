import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import {grid} from "../../components/SearchRow/helpers"
import {useParams, useLocation} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const {name = "Final Fantasy"} = useParams();
  console.log(name)

  const [games, setGames] = useState([]);
  //const history = useHistory();
  const query = useQuery();
  const fuzzy = query.get("fuzzy");
  useEffect(() => {
    if(fuzzy) {
      api.get(`/games/fuzzysearch/${name}`).then(res => {
        setGames(res.data)
      })
    } else {
      api.get(`/games/${name}`).then(result => {
        setGames(result.data);
        
      });
    }

  }, [name, fuzzy]);

  

  const searchList = grid(games, true)
  return <Fragment>
      {searchList}
      </Fragment>;
//   return (
//     <div>
//       <GameCard />
//     </div>
};
