// Core
import { tasksActions } from '../actions';
import { types } from '../types';


//const message = 'New Task 01';

const id = '5b1fbd9f34e4e96e4610991a';
const task = {
    completed: true,
    favorite:  true,
    id:        '5b1fbd9f34e4e96e4610991a',
    message:   'New Task 05',
};

describe('tasks actions:', () => {
    test('COMPLETE_TASKS', () => {
        expect(tasksActions.completeTasks([task])).toEqual({
            type:    types.COMPLETE_TASKS,
            payload: [task],
        });
    });
    test('CREATE_TASK', () => {
        expect(tasksActions.createTask(task)).toEqual({
            type:    types.CREATE_TASK,
            payload: task,
        });
    });
    test('DELETE_TASK', () => {
        expect(tasksActions.deleteTask(id)).toEqual({
            type:    types.DELETE_TASK,
            payload: id,
        });
    });
    test('FETCH_TASKS', () => {
        expect(tasksActions.fetchTasks([task])).toEqual({
            type:    types.FETCH_TASKS,
            payload: [task],
        });
    });
    test('UPDATE_TASK', () => {
        expect(tasksActions.updateTask(task)).toEqual({
            type:    types.UPDATE_TASK,
            payload: task,
        });
    });
});
