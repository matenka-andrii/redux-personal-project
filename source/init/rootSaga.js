// Core
import { all } from 'redux-saga/effects';

//Instruments
import { tasksWatchers } from '../bus/tasks/saga';

export function* rootSaga () {
    yield all([
        tasksWatchers.watchCompleteTasks(),
        tasksWatchers.watchCreateTask(),
        tasksWatchers.watchDeleteTask(),
        tasksWatchers.watchFetchTasks(),
        tasksWatchers.watchUpdateTask()
    ]);
}
