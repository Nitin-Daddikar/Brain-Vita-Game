
import { SUBMIT_FORM } from '../const/actionTypes';

/**
 * @description action for submit user with left marbles
 */
export const submitForm = (userForm) => {
    return {
        type: SUBMIT_FORM,
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                alert('SUCCESS: Score with user name is sent to server.')
                resolve();
            }, 1000);
        })
    };
}