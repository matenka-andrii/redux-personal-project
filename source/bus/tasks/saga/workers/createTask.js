// Core
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api, token } from '../../../../config/api';
import { tasksActions } from 'bus/tasks/actions';
import { uiActions } from 'bus/ui/actions';

export function* callCreateTaskWorker ({ payload: todo }) {
    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, `${api}`, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ message: todo }),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.createTask(data));
        yield put(actions.reset('forms.create'));
    } catch (error) {
        yield put(uiActions.emmitError(error, 'createTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}
