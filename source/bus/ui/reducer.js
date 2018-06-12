// Core
import { Map } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    isTasksFetching: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASKS_FETCHING_STATE:
            return state.set('isTasksFetching', action.payload);

        default:
            return state;
    }
};
