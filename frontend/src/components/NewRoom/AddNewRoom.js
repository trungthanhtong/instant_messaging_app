import React from "react";
import NewRoom from "./NewRoom";

export default function AddNewRoom() {
    return (
        <div
            className="options bg-secondary"
            style={{
                height: "45px",
                borderBottom: "1px solid black",
            }}
        >
            <button
                className="btn d-none d-lg-inline-block btn-secondary"
                style={{
                    width: "100%",
                    height: "100%",
                }}
                data-bs-toggle="modal"
                data-bs-target="#newRoom"
            >
                + Add new room
            </button>
            <button
                className="btn d-lg-none d-inline-block btn-secondary"
                style={{
                    width: "100%",
                    height: "100%",
                }}
                data-bs-toggle="modal"
                data-bs-target="#newRoom"
            >
                +
            </button>
            <div className="modal" id="newRoom" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                className="w-100 btn btn-outline-primary mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#ownRoom"
                                data-bs-dismiss="modal"
                            >
                                <i className="fa fa-plus"></i> Create your own
                                room
                            </button>
                            <button
                                className="w-100 btn btn-outline-primary mb-2 "
                                data-bs-toggle="modal"
                                data-bs-target="#joinRoom"
                                data-bs-dismiss="modal"
                            >
                                <i className="fa fa-users"></i> Join a room
                            </button>
                            <button
                                className="w-100 btn btn-outline-primary mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#chatWith"
                                data-bs-dismiss="modal"
                            >
                                <i className="fa fa-comment"></i> Chat with...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NewRoom id="ownRoom" name="Room Name" type="ownRoom" text="Create your own room"/>
            <NewRoom id="joinRoom" name="Room ID" type="joinRoom" text="Enter room ID to join"/>
            <NewRoom id="chatWith" name="Email" type="email" text="Enter your friend's email"/>
        </div>
    );
}
