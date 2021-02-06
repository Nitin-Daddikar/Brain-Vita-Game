import cloneDeep from 'lodash/cloneDeep';
import { DEFAULT_BOARD} from '../const/boardConstants';


const defaultState = {
    boardStatus : cloneDeep(DEFAULT_BOARD)
}

const appReducer = (state = defaultState, action) => {
    switch (action.type) {
    }
    return state;
};

export default appReducer;