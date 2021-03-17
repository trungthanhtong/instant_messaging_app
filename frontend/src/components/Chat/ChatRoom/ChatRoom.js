import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function ChatRoom(props) {
    let {email} = useSelector(state => state.UserReducer.user)

    if (props.room.isPrivate) {
        let other = props.room.users.find(user => user.email !== email);
        return (
            <Fragment>
                <a
                    className={`nav-link roomListItem text-white ${props.active}`}
                    data-bs-toggle="pill"
                    href={`#room${props.room._id}`}
                    ref={props.firstRoom}
                >
                    {other.firstName} {other.lastName}
                </a>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <a
                    className={`nav-link roomListItem text-white ${props.active}`}
                    data-bs-toggle="pill"
                    href={`#room${props.room._id}`}
                    style={{
                        display: "block",
                        width: "100%",
                        height: "50px",
                    }}
                    ref={props.firstRoom}
                >
                    {props.room.name}
                </a>
            </Fragment>
        );
    }
}
