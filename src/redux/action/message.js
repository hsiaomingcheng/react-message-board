/*
* action type
*/
export const ADD_MESSAGE = 'ADD_MESSAGE';

/*
* action creator
*/
export function addMessage(info) {
    return { type: ADD_MESSAGE, info };
}