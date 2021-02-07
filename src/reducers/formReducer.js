import { SUBMIT_FORM } from '../const/actionTypes';

const formReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_FORM: // action to submit user form
            state = {
                ...state
            }
            break;
    }
    return state;
};

export default formReducer;