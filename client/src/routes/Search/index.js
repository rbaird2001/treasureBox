 import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
//import GameCard from "../../components/GameCard";
import SearchRow from "../../components/SearchRow"
import {useParams, useHistory} from "react-router-dom";

export default () => {
  const {name = "Final Fantasy"} = useParams();
  console.log(name)

  const [games, setGames] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get(`/games/${name}`).then(result => {
      setGames(result.data);
      setTimeout(() => {
        history.push('/about')
      }, 10000)
    });
  }, [name]);

  const searchList = () => {
    //return games.map((game) => <GameCard img={game.cover} key={game.id} /> );
    // let divRows = [];
    return games.reduce((final, game, i, _games) => {
      if(i%3 === 0) {
        const [item1, item2, item3] = [i, i + 1, i + 2];
        console.log(item1,item2,item3);

        final.push(
          <SearchRow
            rowId={`${item1}${item2}${item3}`}
            item1={_games[item1]}
            item2={_games[item2]}
            item3={_games[item3]} 
          />
        )
      }
      return final;
    }, [])
    // for(let i=0;i<games.length;i+=3){
    //   let j = i+1;
    //     let item1 = j
    //     let item2 = j+1
    //     let item3 = j+2
    //     let rowId = `${item1}${item2}${item3}`
    //     divRows.push(<SearchRow rowId={rowId} item1={item1} item2={item2} item3={item3} />) 
    // }
      }
  return <Fragment>
      {searchList()}
      </Fragment>;
//   return (
//     <div>
//       <GameCard />
//     </div>
};
