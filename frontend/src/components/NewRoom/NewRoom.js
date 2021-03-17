import React, { useRef, useState } from "react";
import Input from "../Input/Input";
import style from "../../css/Login.module.css";
import { useDispatch } from "react-redux";
import { chatWith, createRoom, joinRoom } from "../../redux/actions/ChatRoomActions";

export default function NewRoom(props) {
    const closeModal = useRef(null);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        value: "",
        error: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.error !== "" || state.value.trim() === '') {
            setState({
                error: style.inputBox
            })
            return;
        } else {
            if (props.type === "ownRoom") {
                dispatch(createRoom(state.value));
            } else if (props.type === "joinRoom") {
                dispatch(joinRoom(state.value));
            } else if (props.type === "email") {
                dispatch(chatWith(state.value))
            }
            setState({
                value: "",
                error: "",
            });

            closeModal.current.click();
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        let newError = state.error;
        if (value.trim() === "") {
            newError = style.inputBox;
        } else {
            newError = "";
        }
        if (name === "email") {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            re.test(value.toLowerCase())
                ? (newError = "")
                : (newError = style.inputBox);
        }
        setState({
            ...state,
            value,
            error: newError,
        });
    };

    return (
        <div className="modal" id={props.id} tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h3>{props.text}</h3>
                <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                    <form onSubmit={handleSubmit} className="modal-body">
                        <Input
                            type={props.type}
                            placeholder={props.name}
                            name={props.type}
                            inputBox={state.error}
                            handleChange={handleChange}
                            value={state.value}
                        />
                    </form>
                    <hr />
                    <div className={style.modalFooter}>
                        <button
                            
                            onClick={handleSubmit}
                            className="text-center btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
