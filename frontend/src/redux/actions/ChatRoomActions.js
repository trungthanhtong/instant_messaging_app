import { getCookie } from "../../assets/Cookies";
import { ChatRoomService } from "../../services/ChatRoomService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { SET_CHAT_ROOM } from "../constants/ChatRoomConstants";
import { getUser } from "./UserActions";
import Swal from 'sweetalert2'

export const getRoomList = () => {
    return async (dispatch) => {
        try {
            const token = getCookie();
            let res = await ChatRoomService.getRoomList(token);
            if (res.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_CHAT_ROOM,
                    rooms: res.data
                })
            }
        }
        catch(err) {
            console.log(err)
        }
    };
};

export const sendMessage = (message, roomID) => {
    return async dispatch => {
        try {
            const token = getCookie();
            let {status} = await ChatRoomService.sendMessage(token, message, roomID);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getRoomList())
            }
            else {
                throw new Error('Sending message failed.');
            }
        }
        catch (err) {
            console.log('Sending message fail: ', err.message);
        }
        
    }
}

export const createRoom = (roomName) => {
    return async dispatch => {
        try {
            const token = getCookie();
            let {status} = await ChatRoomService.createRoom(token, roomName);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getUser())
            }
            else {
                throw new Error('Create Room failed');
            }
        }
        catch (err) {
            console.log('Create room failed', err.message);
        }
    }
}

export const joinRoom = (roomID) => {
    return async dispatch => {
        try {
            const token = getCookie();
            let {status} = await ChatRoomService.joinRoom(token, roomID);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getUser());
            }
            else {
                throw new Error('Join Room Error')
            }
        }
        catch (err) {
            console.log('Join Room Failed', err.message);
            Swal.fire({
                title: "Error!",
                text: "Room not found...",
                icon: "error",
                confirmButtonText: "Try Again...",
            });
        }
    }
}

export const chatWith = (email) => {
    return async dispatch => {
        try {
            const token = getCookie();
            let {status} = await ChatRoomService.chatWith(token, email);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getUser());
            }

        }
        catch(err) {
            console.log(err.message);
            Swal.fire({
                title: "Error!",
                text: "Email not found...",
                icon: "error",
                confirmButtonText: "Try Again...",
            });
        }
    }
}

export const leaveRoom = (roomID) => {
    return async dispatch => {
        try {
            const token = getCookie();
            let {status} = await ChatRoomService.leaveRoom(token, roomID);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getUser());
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
}
