// Core
import { combineReducers } from 'redux';

// Instruments
import { uiReducer as ui } from 'bus/ui/reducer';
import { tasksReducer as tasks } from 'bus/tasks/reducer';
import { formsReducer as forms } from 'bus/forms/reducer';

export const rootReducer = combineReducers({
    ui,
    tasks,
    forms,
});
