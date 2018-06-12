// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { api, token } from '../../../../config/api';
import { tasksActions } from 'bus/tasks/actions';
import { uiActions } from 'bus/ui/actions';

export function* callDeleteTaskWorker ({ payload: id }) {
    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
        });

        if (response.status !== 204) {
            throw new Error('Delete task error');
        }

        yield put(tasksActions.deleteTask(id));
    } catch (error) {
        yield put(uiActions.emmitError(error, 'deleteTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}
