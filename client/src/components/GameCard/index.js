import React from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import ReadMoreReact from "read-more-react";
import "./gameCard.css"
export default ({ id, img, summary, canAdd }) => {
  const history = useHistory();
  const addSelection = gameId => () => {
    api.post(`/games/${gameId}`).then(() => {
      history.push("/");
    });
  };
  return (
    <div
      className="card mb-4 shadow-sm"
      data-toggle="modal"
      data-target="#exampleModal1"
    >
      <img
        className="bd-placeholder-img card-img-top"
        width="100%"
        height={225}
        src={img}
        aria-label="Placeholder: Thumbnail"
      />
      <div className="card-body">
        <p className="card-text">
            <ReadMoreReact
              text={summary}
              min={25}
              ideal={75}
              max={512}
              readMoreText="Read more"
            />
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            {canAdd ? (
              <button
                type="button"
                className="gameButton btn btn-secondary"
                id={id}
                onClick={addSelection(id)}
              >
                Add to Collection
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
