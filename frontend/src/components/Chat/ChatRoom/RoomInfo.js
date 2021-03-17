import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { chatWith, leaveRoom } from "../../../redux/actions/ChatRoomActions";

export default function RoomInfo(props) {
    const dispatch = useDispatch();

    const [open, toggle] = useState(false);

    const isExpansive = open ? { display: "block" } : { display: "none" };

    const leaveChat = () => {
        dispatch(leaveRoom(props.room._id));
        toggle(!open);
    };

    const renderInfo = () => {
        if (props.room.isPrivate) {
            return (
                <div className="roomInfo">
                    <button onClick={leaveChat}>
                        <i className="fa fa-sign-out-alt"></i> Leave chat
                    </button>
                </div>
            );
        } else {
            return (
                <div className="roomInfo">
                    <button onClick={leaveChat}>
                        <i className="fa fa-sign-out-alt"></i> Leave chat
                    </button>
                    <p>
                        ID:{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {props.room._id}
                        </span>
                    </p>
                    <div className="userList">
                        {props.room.users.map((user, index) => {
                            return (
                                <div
                                    className="userInfo"
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        dispatch(chatWith(user.email))
                                    }}
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/human/${user.firstName}.svg`}
                                        alt="avatar"
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                            backgroundColor: "gray",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="options">
            <button
                onClick={() => toggle(!open)}
                className="infoButton"
                type="button"
            >
                <i className="fa fa-bars"></i>
            </button>
            <div style={isExpansive} className="info-container">
                {renderInfo()}
            </div>
        </div>
    );
}
