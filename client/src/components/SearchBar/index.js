import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
export default () => {
  const history = useHistory();
  const [searchVal, setVal] = useState("");
  const handleChange = evt => setVal(evt.target.value);
  const handlesearchBtnClick = () => history.push(`/search/${searchVal}`);
  const handleEnterKey = evt => {
    if(evt.keyCode === 13) {
      handlesearchBtnClick();
    }
  }
  const goToUPC = () => {
    history.push("/upc");
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Partial Names Accepted"
            aria-label="Search Game Title"
            aria-describedby="button-search"
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            value={searchVal}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-search"
              onClick={handlesearchBtnClick}
            >
              Search
            </button>
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={goToUPC}>
                Use UPC Scanner
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
