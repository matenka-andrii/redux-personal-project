// Core
import { Map } from 'immutable';
import { taskReducer } from '../reducer';
import { taskActions } from '../actions';

const id = '5b1fbd9f34e4e96e4610991a';
const message = 'New Task 01';
const initialState = Map({
    editingTaskId:  '',
    editingTaskMsg: '',
});

describe('task reducer:', () => {
    test('should return initial state', () => {
        expect(taskReducer(void 0, { type: '@@INIT'})).toEqual(initialState);
    });
    test('should handle SET_TASK_ID_STATE', () => {
        expect(taskReducer(void 0, taskActions.setTaskIdState(id))).toEqual(
            initialState.set('editingTaskId', id),
        );
    });
    test('should handle SET_TASK_MSG_STATE', () => {
        expect(taskReducer(void 0, taskActions.setTaskMsgState(message))).toEqual(
            initialState.set('editingTaskMsg', message),
        );
    });
});
