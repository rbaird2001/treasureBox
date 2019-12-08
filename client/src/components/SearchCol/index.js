import React from "react";
import GameCard from "../GameCard"

export default ({id,img,summary}) => (
    <div className="gameCol col sm-4" id={id}>
        <GameCard img={img} summary={summary} />
    </div>
)