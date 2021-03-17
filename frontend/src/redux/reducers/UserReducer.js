/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import { REMOVE_USER, SET_USER } from "../constants/UserConstants"

const initialState = {
    user:{},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            // Object.keys(action.userInfo).find(item => console.log(item))
            const chatRooms = action.userInfo.chatRooms ? action.userInfo.chatRooms : [];
            state.user = {...action.userInfo, chatRooms, avatar: `https://avatars.dicebear.com/api/human/${action.userInfo.firstName}.svg`};
            return {...state}
        }
        case REMOVE_USER: {
            state.user = {};
            return {...state}
        }
    }
    return {...state}
}
