// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { asyncTypes } from './asyncTypes';
import { callCompleteTasksWorker } from './workers/completeTasks';
import { callCreateTaskWorker } from './workers/createTask';
import { callDeleteTaskWorker } from './workers/deleteTask';
import { callFetchTasksWorker } from './workers/fetchTasks';
import { callUpdateTaskWorker } from './workers/updateTask';

export const tasksWatchers = Object.freeze({
    * watchCompleteTasks () {
        yield takeEvery(asyncTypes.COMPLETE_TASKS_ASYNC, callCompleteTasksWorker);
    },
    * watchCreateTask () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },
    * watchDeleteTask () {
        yield takeEvery(asyncTypes.DELETE_TASK_ASYNC, callDeleteTaskWorker);
    },
    * watchFetchTasks () {
        yield takeEvery(asyncTypes.FETCH_TASKS_ASYNC, callFetchTasksWorker);
    },
    * watchUpdateTask () {
        yield takeEvery(asyncTypes.UPDATE_TASK_ASYNC, callUpdateTaskWorker);
    },
});
