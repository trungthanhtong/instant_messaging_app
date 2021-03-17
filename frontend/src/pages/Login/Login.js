import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Input from "../../components/Input/Input";
import SignUp from "../../components/SignUp/SignUp";
import style from "../../css/Login.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions/UserActions";



export default function Login(props) {
    const dispatch = useDispatch();

    let [state, setState] = useState({
        values: {
            email: "",
            password: "",
        },
        errors: {
            email: "",
            password: "",
        },
    });

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
            await dispatch(logIn(values.email, values.password))
            props.history.push("/home")
        }
    };

    const goBack = () => {
        console.log('redirect')
        props.history.push("/home");
    };

    return (
        <div className={style.background}>
            <div className="container">
                <p className="display-4 text-center text-primary pt-5">
                    Instant Messaging App
                </p>
                <h5 className="text-center mb-5 text-white">
                    Please login to continue
                </h5>
                <form onSubmit={handleSubmit} className={style.form}>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        inputBox={state.errors.email}
                        handleChange={handleChange}
                        value={state.values.email}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        inputBox={state.errors.password}
                        handleChange={handleChange}
                        value={state.values.password}
                    />
                    <button className="btn btn-primary mt-3 w-100">
                        Log In
                    </button>
                    <NavLink
                        className="text-primary mt-2 nav-link text-center"
                        to="/"
                    >
                        Forgot password?
                    </NavLink>
                    <hr />
                    <button
                        type="button"
                        className="btn btn-success w-50"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        Create New Account
                    </button>
                </form>
                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                >
                    Î
                    <div className="modal-dialog modal-dialog-centered">
                        <SignUp goBack={goBack} />
                    </div>
                </div>
            </div>
        </div>
    );
}
