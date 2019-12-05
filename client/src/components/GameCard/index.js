import React from "react";

export default ({img}) => {
    return (
        <div className="card mb-4 shadow-sm" data-toggle="modal" data-target="#exampleModal1">
                        <img src={img} />
                        <div className="card-body">
                            <p className="card-text fontOswald">This is a wider card with supporting text below as a natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                </div>
                            </div>
                        </div>
                    </div>
    )
}