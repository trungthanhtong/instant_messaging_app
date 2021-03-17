import React, { useEffect, useRef, useState } from "react";
import "../../css/Chat.css";
import Messages from "../../components/Chat/Message/Messages";
import AddNewRoom from "../../components/NewRoom/AddNewRoom";
import NewMessage from "../../components/Chat/Message/NewMessage";
import { useDispatch, useSelector } from "react-redux";
import ChatRoom from "../../components/Chat/ChatRoom/ChatRoom";
import { getUser } from "../../redux/actions/UserActions";
import io from "socket.io-client";
import RoomInfo from "../../components/Chat/ChatRoom/RoomInfo";

const socket = io("http://localhost:5000");

export default function Home(props) {
    const rooms = useSelector((state) => state.ChatRoomReducer.rooms);

    const dispatch = useDispatch();

    const [expand, toggle] = useState(false);

    const listExpand = expand ? {transform: "translateX(0)"} : null;
    const rightArrow = expand ? {display: "none"} : {};
    const leftArrow = expand ? {} : {display: "none"};

    const firstRoom = useRef(null);

    useEffect(() => {
        dispatch(getUser());
        socket.on("receive-message", () => {
            dispatch(getUser()).then(() => {});
        });
    }, []);

    const renderRoomList = () => {
        if (rooms) {
            return rooms.map((room, index) => {
                let active = index === 0 ? "active" : "";
                return (
                    <ChatRoom
                        firstRoom={index === 0 ? firstRoom : null}
                        room={room}
                        active={active}
                        key={index}
                    />
                );
            });
        }
    };

    const renderChatRoom = () => {
        if (rooms) {
            return rooms.map((room, index) => {
                let active = index === 0 ? "active show" : "";
                return (
                    <div
                        key={index}
                        className={`tab-pane bg-dark text-light ${active}`}
                        id={`room${room._id}`}
                    >
                        <div
                            className="bg-secondary text-end"
                            style={{
                                height: "45px",
                                borderBottom: "1px solid black",
                            }}
                        >
                            <RoomInfo room={room} />
                        </div>
                        <div style={{ position: "relative" }}>
                            <div
                                style={{
                                    height: "calc(100vh - 170px)",
                                    overflow: "scroll",
                                }}
                            >
                                <Messages messages={room.messages} />
                            </div>
                        </div>
                        <NewMessage firstRoom={firstRoom} roomID={room._id} />
                    </div>
                );
            });
        }
    };

    return (
        <div className="container-fluid p-0 bg-dark m-0">
            <div className="row" style={{ margin: 0, padding: 0 }}>
                <div className="col-2" id="roomList">
                    <AddNewRoom />
                    <div style={listExpand} className="toggle" onClick={() => toggle(!expand)}>
                        <i style={rightArrow} className="fa fa-arrow-right"></i>
                        <i style={leftArrow} className="fa fa-arrow-left"></i>
                    </div>
                    <div
                        className="nav nav-pills bg-secondary col-2 w-100"
                        id="roomListItem"
                        style={listExpand}
                    >
                        {renderRoomList()}
                    </div>
                </div>
                <div
                    className="tab-content col-md-10 col-12"
                    id="v-pills-tabContent"
                    style={{ margin: 0, padding: 0 }}
                >
                    {renderChatRoom()}
                </div>
            </div>
        </div>
    );
}