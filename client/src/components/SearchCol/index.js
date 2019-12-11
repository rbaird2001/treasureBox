import React from "react";
import GameCard from "../GameCard"

export default ({id,img,summary, canAdd}) => (
    <div className="gameCol col sm-4" id={`gamecol-${id}`}>
        <GameCard canAdd={canAdd} img={img} summary={summary} id={id} />
    </div>
)