// Core
import { taskActions } from '../actions';
import { types } from '../types';

const id = '5b1fbd9f34e4e96e4610991a';
const message = 'New Task 01';

describe('task actions:', () => {
    test('SET_TASK_ID_STATE', () => {
        expect(taskActions.setTaskIdState(id)).toEqual({
            type:    types.SET_TASK_ID_STATE,
            payload: id,
        });
    });
    test('SET_TASK_MSG_STATE', () => {
        expect(taskActions.setTaskMsgState(message)).toEqual({
            type:    types.SET_TASK_MSG_STATE,
            payload: message,
        });
    });
});
