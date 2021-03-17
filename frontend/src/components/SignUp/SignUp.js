import React, { useRef, useState } from "react";
import style from "../../css/Login.module.css";
import Input from "../Input/Input";
import {useDispatch} from 'react-redux';
import { createUser } from "../../redux/actions/UserActions";


export default function SignUp(props) {
    let [state, setState] = useState({
        values: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        errors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        let { name, value } = e.target;
        let newValues = { ...state.values, [name]: value };
        let newErrors = { ...state.errors };
        if (value.trim() === "") {
            newErrors[name] = style.inputBox;
        } else {
            newErrors[name] = "";
        }
        if (name === "email") {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            re.test(value.toLowerCase())
                ? (newErrors[name] = "")
                : (newErrors[name] = style.inputBox);
        }
        if (name === "passwordConfirm") {
            if (value !== state.values.password) {
                newErrors[name] = style.inputBox;
            } else {
                newErrors[name] = "";
            }
        }
        if (name === 'password') {
            if (value !== state.values.passwordConfirm) {
                newErrors['passwordConfirm'] = style.inputBox
            }
            else {
                newErrors['passwordConfirm'] = '';
            }
        }
        setState({
            ...state,
            values: { ...newValues },
            errors: { ...newErrors },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let { values, errors } = state;
        for (let key in errors) {
            if (errors[key].trim() !== "") {
                valid = false;
            }
        }
        for (let key in values) {
            if (values[key].trim() === "") {
                valid = false;
                errors[key] = style.inputBox;
            }
        }
        setState({
            ...state,
            values,
            errors,
        });
        if (valid) {
            values.email = values.email.toLowerCase();
            closeRef.current.click();
            dispatch(createUser(values))
        }
    };

    const closeRef = useRef(null)

    return (
        <form className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                    Sign Up
                </h5>
                <button
                    ref={closeRef}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div className="modal-body">
                <div className={style.formGroup} style={{ display: "flex" }}>
                    <div style={{ width: "50%", marginRight: 5 }}>
                        <Input
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            inputBox={state.errors.firstName}
                            handleChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "50%", marginLeft: 5 }}>
                        <Input
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            inputBox={state.errors.lastName}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <div className={style.formGroup}>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        inputBox={state.errors.email}
                        handleChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        inputBox={state.errors.password}
                        handleChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        name="passwordConfirm"
                        inputBox={state.errors.passwordConfirm}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <hr />
            <div className={style.modalFooter}>
            
                <button onClick={handleSubmit} type="submit" className="btn btn-success w-75">
                    Sign Up
                </button>
            </div>
        </form>
    );
}
