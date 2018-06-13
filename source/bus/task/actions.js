// Instruments
import { types } from './types';

export const taskActions = Object.freeze({
    setTaskIdState: (id) => ({
        type:    types.SET_TASK_ID_STATE,
        payload: id,
    }),
    setTaskMsgState: (message) => ({
        type:    types.SET_TASK_MSG_STATE,
        payload: message,
    }),
});
