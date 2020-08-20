import { combineReducers } from 'redux';
import {ADD_MESSAGE} from '../action/message';

const defaultMessage = {
    name: 'chris',
    text: '測試一號',
    time: '1990-07-8 12:00:00',
    responseArray: [],
}

function messageList(state = [defaultMessage], action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return action.info;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    messageList,
});
export default rootReducer;