import { SET_CHAT_ROOM } from "../constants/ChatRoomConstants"
import { REMOVE_USER } from "../constants/UserConstants"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    rooms: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CHAT_ROOM: {
            state.rooms = [...action.rooms]
            return {...state}
        }
        default: return {...state}
        case REMOVE_USER: {
            state.room = []
            return {...state}
        }
    }
}
