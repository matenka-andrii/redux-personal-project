// Core
import { Map } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    editingTaskId:  '',
    editingTaskMsg: '',
});

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASK_ID_STATE:
            return state.set('editingTaskId', action.payload);

        case types.SET_TASK_MSG_STATE:
            return state.set('editingTaskMsg', action.payload);

        default:
            return state;
    }
};
