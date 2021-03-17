import Axios from 'axios'
import { DOMAIN } from '../util/constants/settingSystem'

class chatRoomService {
    getRoomList = (token) => {
            return  Axios({
                url: `${DOMAIN}/chatRooms/get-room-list`,
                method: 'PUT',
                data: {token}
            })
        
    }

    leaveRoom = (token, roomID) => {
        return Axios({
            url:`${DOMAIN}/chatrooms/leave`,
            method:'PUT',
            data: {token, roomID}
        })
    }

    sendMessage = (token, message, roomID) => {
        return Axios({
            url:`${DOMAIN}/chatrooms/new-message`,
            method:'PUT',
            data: {token, message, roomID}
        })
    }

    createRoom = (token, roomName) => {
        return Axios({
            url: `${DOMAIN}/chatrooms/create`,
            method: 'POST',
            data: {token, roomName}
        })
    }

    joinRoom = (token, roomID) => {
        return Axios({
            url: `${DOMAIN}/chatrooms/join`,
            method: 'PUT',
            data: {token, roomID}
        })
    }

    chatWith = (token, email) => {
        return Axios({
            url: `${DOMAIN}/chatrooms/chatWith`,
            method: 'POST',
            data: {token, email}
        })
    }
}

export const ChatRoomService = new chatRoomService()