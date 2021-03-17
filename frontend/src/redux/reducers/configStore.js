import {applyMiddleware, combineReducers, createStore} from 'redux'
import reduxThunk from 'redux-thunk'
import UserReducer from './UserReducer'
import ChatRoomReducer from './ChatRoomReducer'

const rootReducer = combineReducers({
    UserReducer,
    ChatRoomReducer,
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));


export default store;