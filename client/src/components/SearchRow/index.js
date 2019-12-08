import React from "react";
import SearchCol from "../SearchCol";
//import SearchCol from "../SearchCol"

export default ({rowId,item1,item2,item3}) => {
    const searchCols = [item1,item2,item3]
        .filter(item => !!item)
        .map(item => <SearchCol id={item.id} img={item.cover} summary={item.summary || "Summary Unavailable"} />)
    return <div className="gamerow row" id={rowId}>
        {searchCols}
    </div>

};




