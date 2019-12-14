import React from "react";
import {useHistory} from "react-router-dom";
import api from '../../services/api'



export default ({ id, img, summary, canAdd }) => {
    const history = useHistory();
    const addSelection = gameId => () => {
        api.post(`/games/${gameId}`).then(() => {
            history.push('/');
        })
    }
  return (
    <div
      className="card mb-4 shadow-sm"
      data-toggle="modal"
      data-target="#exampleModal1"
    >
      <div className="card-body">
        <img src={img} className="img-fluid.max-width: 95%" />

        <p className="card-text fontOswald">{summary.substring(0,255)}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            {canAdd ? (<button
              type="button"
              className="gameButton btn btn-secondary"
              id={id}
              onClick={addSelection(id)}
            >
              Add to Collection
            </button>) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
