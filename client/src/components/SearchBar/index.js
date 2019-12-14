import React, { useState } from "react";
import { useHistory } from "react-router-dom";
export default () => {
  const history = useHistory();
  const [searchVal, setVal] = useState("");
  const handleChange = evt => setVal(evt.target.value);
  const handlesearchBtnClick = () => history.push(`/search/${searchVal}`);
  return (
    <div className="row mt-4">
      <div className="col-12 width-75">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Partial Names Accepted"
            aria-label="Search Game Title"
            aria-describedby="button-search"
            onChange={handleChange}
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
          </div>
        </div>
      </div>
    </div>
  );
};
