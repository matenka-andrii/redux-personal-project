// Instruments
import { types } from './types';

export const tasksActions = Object.freeze({
    completeTasks: (tasks) => ({
        type:    types.COMPLETE_TASKS,
        payload: tasks,
    }),
    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    deleteTask: (id) => ({
        type:    types.DELETE_TASK,
        payload: id,
    }),
    fetchTasks: (tasks) => ({
        type:    types.FETCH_TASKS,
        payload: tasks,
    }),
    updateTask: (task) => ({
        type:    types.UPDATE_TASK,
        payload: task,
    }),
});
