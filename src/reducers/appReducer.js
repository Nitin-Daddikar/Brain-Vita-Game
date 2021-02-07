import cloneDeep from 'lodash/cloneDeep';
import * as types from '../const/actionTypes';
import { DEFAULT_BOARD, PICKED, OCCUPIED, VACANT } from '../const/boardConstants';

const defaultState = {
    boardStatus : cloneDeep(DEFAULT_BOARD),
    pickedMarble: null
}

const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.MARBLE_PICKED: // action when marble is picked
            state.boardStatus[action.payload.x][action.payload.y] =  PICKED;
            state = {
                ...state,
                pickedMarble: action.payload,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
        case types.MARBLE_RELEASED: // action when marble is dropped at same location
        case types.MARBLE_DROPPED: // action when marble is dropped at vacant location
            state.boardStatus[action.payload.x][action.payload.y] =  OCCUPIED;
            state = {
                ...state,
                pickedMarble: null,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
        case types.MARBLE_REMOVED: // action to remove marble from board and make place vacant
            state.boardStatus[action.payload.x][action.payload.y] =  VACANT;
            state = {
                ...state,
                pickedMarble: null,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
        case types.RESET_BOARD: // action to restart/reset game
            state = {
                ...state,
                pickedMarble: null,
                boardStatus : cloneDeep(DEFAULT_BOARD)
            }
            break;
    }
    return state;
};

export default appReducer;