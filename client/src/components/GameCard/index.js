import React from "react";

export default ({img,summary}) => {
    return (
        <div className="card mb-4 shadow-sm" data-toggle="modal" data-target="#exampleModal1">
                        <div className="card-body">
                        <img src={img} />
    <p className="card-text fontOswald">{summary}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                </div>
                            </div>
                        </div>
                    </div>
    )
}