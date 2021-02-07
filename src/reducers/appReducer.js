import cloneDeep from 'lodash/cloneDeep';
import { MARBLE_PICKED, MARBLE_RELEASED, MARBLE_DROPPED, MARBLE_REMOVED } from '../const/actionTypes';
import { DEFAULT_BOARD, PICKED, OCCUPIED, VACANT } from '../const/boardConstants';

const defaultState = {
    boardStatus : cloneDeep(DEFAULT_BOARD),
    pickedMarble: null
}

const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MARBLE_PICKED:
            state.boardStatus[action.payload.x][action.payload.y] =  PICKED;
            state = {
                ...state,
                pickedMarble: action.payload,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
        case MARBLE_RELEASED:
        case MARBLE_DROPPED:
            state.boardStatus[action.payload.x][action.payload.y] =  OCCUPIED;
            state = {
                ...state,
                pickedMarble: null,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
        case MARBLE_REMOVED:
            state.boardStatus[action.payload.x][action.payload.y] =  VACANT;
            state = {
                ...state,
                pickedMarble: null,
                boardStatus : cloneDeep(state.boardStatus)
            }
            break;
    }
    return state;
};

export default appReducer;