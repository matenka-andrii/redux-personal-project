// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { api, token } from '../../../../config/api';
import { tasksActions } from 'bus/tasks/actions';
import { uiActions } from 'bus/ui/actions';

export function* callUpdateTaskWorker ({ payload: task }) {
    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify([task]),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.updateTask(data[0]));
    } catch (error) {
        yield put(uiActions.emmitError(error, 'updateTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}
