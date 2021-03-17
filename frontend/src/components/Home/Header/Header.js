import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCookie } from "../../../assets/Cookies";
import {
    getUser,
    removeUser,
} from "../../../redux/actions/UserActions";

export default function Header(props) {
    const userInfo = useSelector((state) => state.UserReducer.user);

    const history = useHistory()

    const dispatch = useDispatch();

    useEffect(() => {
        if (getCookie()) {
            dispatch(getUser());
        }
    }, []);

    const logOut =  () => {
        dispatch(removeUser());
        history.push("/")
    };

    const renderUserManager = () => {
        const token = getCookie();
        if (token) {
            return (
                <div className="dropdown dropstart">
                    <div
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        style={{ color: "white" }}
                    >
                        <img
                            src={userInfo.avatar}
                            alt="avatar"
                            style={{
                                height: "40px",
                                width: "40px",
                                backgroundColor: "gray",
                                marginRight: "10px",
                            }}
                        />
                        <span>
                            {userInfo.firstName} {userInfo.lastName}
                        </span>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <button className="dropdown-item" href="#">
                                <i className="fa fa-cog"></i> Setting
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={logOut}
                                className="dropdown-item bg-danger"
                                href="#"
                            >
                                <i className="fa fa-sign-out-alt"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                >
                    Login
                </NavLink>
            );
        }
    };

    return (
        <div>
            <nav
                className="navbar navbar-expand-sm navbar-dark bg-dark"
                style={{ height: "60px" }}
            >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Instant Messaging App
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                            <li className="nav-item">{renderUserManager()}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
