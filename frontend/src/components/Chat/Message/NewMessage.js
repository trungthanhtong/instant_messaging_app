import React, { useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import { getCookie } from "../../../assets/Cookies";

const socket = io('http://localhost:5000/');

export default function NewMessage(props) {

    const {id} = useSelector(state => state.UserReducer.user);

    const [state, setState] = useState({
        id,
        message: ''
    })

    const handleChange = e => {
        let {value} = e.target;
        setState({
            ...state,
            message: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (state.message.trim() === '') {
            return;
        }
        else {
            let {message} = state;
            setState({
                message: ''
            })
            socket.emit('send-message', {token: getCookie(), roomID: props.roomID, message});
        }
    }

    return (
        <div>
            <form
                className="input-group"
                style={{
                    height: "40px",
                    padding: "15px",
                    marginBottom: "10px",
                }}
                onSubmit={handleSubmit}
            >
                <input className="form-control" type="text" autoComplete="off" onChange={handleChange} name="message" value={state.message} />
                <button className="btn btn-primary">Send</button>
            </form>
        </div>
    );
}
