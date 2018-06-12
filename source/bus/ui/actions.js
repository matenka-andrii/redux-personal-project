// Instruments
import { types } from './types';

export const uiActions = Object.freeze({
    emmitError: (error, meta = null) => ({
        type:    types.EMMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    setTasksFetchingState: (state) => ({
        type:    types.SET_TASKS_FETCHING_STATE,
        payload: state,
    }),
});
