import React from "react";
import SearchCol from "../SearchCol";
//import SearchCol from "../SearchCol"

export default ({rowId,item1,item2,item3, canAdd}) => {
    const searchCols = [item1,item2,item3]
        .filter(item => !!item)
        .map(item => <SearchCol canAdd={canAdd} id={item.id} img={item.url} summary={item.summary || "Summary Unavailable"} />)
    return <div className="container">
    <div className="gamerow row" id={rowId}>
        {searchCols}
    </div>
    </div>

};




