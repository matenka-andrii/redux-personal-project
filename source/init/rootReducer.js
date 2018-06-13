// Core
import { combineReducers } from 'redux';

// Instruments
import { formsReducer as forms } from 'bus/forms/reducer';
import { taskReducer as task } from 'bus/task/reducer';
import { tasksReducer as tasks } from 'bus/tasks/reducer';
import { uiReducer as ui } from 'bus/ui/reducer';

export const rootReducer = combineReducers({
    forms,
    task,
    tasks,
    ui,
});
