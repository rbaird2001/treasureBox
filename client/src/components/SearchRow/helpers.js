import React from "react";
import SearchRow from "./index";
export const grid = (games, canAdd = false) => {
  return games.reduce((final, game, i, _games) => {
    if (i % 3 === 0) {
      const [item1, item2, item3] = [i, i + 1, i + 2];
      console.log(item1, item2, item3);

      final.push(
        <SearchRow
          canAdd={canAdd}
          rowId={`${item1}${item2}${item3}`}
          item1={_games[item1]}
          item2={_games[item2]}
          item3={_games[item3]}
        />
      );
    }
    return final;
  }, []);
};
