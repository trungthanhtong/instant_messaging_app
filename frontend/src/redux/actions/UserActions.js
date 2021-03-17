import { removeCookie, setCookie } from "../../assets/Cookies";
import { userService } from "../../services/UserService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { REMOVE_USER, SET_USER } from "../constants/UserConstants";
import {getRoomList} from './ChatRoomActions'
import Swal from "sweetalert2";

export const setUser = (userInfo) => ({
    type: SET_USER,
    userInfo,
});

export const createUser = (user, redirect) => {
    return async (dispatch) => {
        try {
            const { status, data } = await userService.createUser(user);
            if (status === STATUS_CODE.SUCCESS) {
                const { token, userInfo } = data;
                setCookie(token);
                dispatch(setUser(userInfo));
                redirect()

            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Email has already been used...",
                icon: "error",
                confirmButtonText: "Try Again...",
            });
            console.log("Error: ", err.message);
        }
    };
};

export const logIn = (email, password) => {
    return async (dispatch) => {
        try {
            const { status, data } = await userService.findUser(
                email,
                password
            );
            if (status === STATUS_CODE.SUCCESS) {
                const { token, userInfo } = data;
                setCookie(token);
                await dispatch(setUser(userInfo));
            }
        } catch (err) {
            console.log("Error: ", err.message);
            Swal.fire({
                title: "Error!",
                text: "Wrong Email/Password",
                icon: "error",
                confirmButtonText: "Try Again...",
            });
        }
    };
};

export const getUser = () => {
    return async (dispatch) => {
        try {
            const { status, data } = await userService.getUser();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(setUser(data));
                dispatch(getRoomList())
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }
    };
};

export const removeUser = () => {
    removeCookie();
    return {
        type: REMOVE_USER,
    };
};
