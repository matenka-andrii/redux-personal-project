// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { api, token } from '../../../../config/api';
import { tasksActions } from 'bus/tasks/actions';
import { uiActions } from 'bus/ui/actions';

export function* callCompleteTasksWorker () {
    try {
        yield put(uiActions.setTasksFetchingState(true));

        const tasks = yield select(
            (state) => state.tasks.map((task) => task.set('completed', true))
        );

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(tasks.toJS()),
        });

        const { message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.completeTasks(tasks));
    } catch (error) {
        yield put(uiActions.emmitError(error, 'completeTasksWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}
