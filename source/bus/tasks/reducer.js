// Core
import { List, fromJS } from 'immutable';

// Instrument
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COMPLETE_TASKS:
            return action.payload;

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.DELETE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);

        case types.FETCH_TASKS:
            return fromJS(action.payload);

        case types.UPDATE_TASK:
            return state.update(
                state.findIndex(
                    (task) => task.get('id') === action.payload.id
                ),
                (task) => task.merge(action.payload)
            );

        default:
            return state;
    }
};
