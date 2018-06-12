// Core
import { asyncTypes } from './asyncTypes';

export const tasksActionsAsync = Object.freeze({
    completeTasksAsync: (tasks) => ({
        type:    asyncTypes.COMPLETE_TASKS_ASYNC,
        payload: tasks,
    }),
    createTaskAsync: (message) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: message,
    }),
    deleteTaskAsync: (id) => ({
        type:    asyncTypes.DELETE_TASK_ASYNC,
        payload: id,
    }),
    fetchTasksAsync: () => ({
        type: asyncTypes.FETCH_TASKS_ASYNC,
    }),
    updateTaskAsync: (task) => ({
        type:    asyncTypes.UPDATE_TASK_ASYNC,
        payload: task,
    }),
});
