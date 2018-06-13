// Core
import React, { Component } from 'react';
import Move from 'react-flip-move';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Control } from 'react-redux-form';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';
import { tasksActionsAsync } from 'bus/tasks/saga/asyncActions';

// Components
import Task from 'components/Task';
import Spinner from 'components/Spinner';

const sortTasks = (tasks) => {
    const favorite = tasks.filter((task) => task.get('favorite') && !task.get('completed'));
    const data = tasks.filter((task) => !task.get('favorite') && !task.get('completed'));
    const completed = tasks
        .filter((task) => task.get('completed'))
        .sort((a, b) => {
            if (a.get('favorite') && !b.get('favorite')) {
                return -1;
            } else if (!a.get('favorite') && b.get('favorite')) {
                return 1;
            }

            return false;
        });

    return [...favorite, ...data, ...completed];
};

const mapStateToProps = (state) => {
    return {
        isTasksFetching: state.ui.get('isTasksFetching'),
        message:         state.forms.create.message,
        searchKeyword:   state.forms.search.message,
        tasks:           sortTasks(state.tasks),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                completeTasksAsync: tasksActionsAsync.completeTasksAsync,
                createTaskAsync:    tasksActionsAsync.createTaskAsync,
                fetchTasksAsync:    tasksActionsAsync.fetchTasksAsync,
            },
            dispatch,
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
export default class Scheduler extends Component {

    componentDidMount () {
        this.props.actions.fetchTasksAsync();
    }

    _createTask = () => {
        const { actions, message } = this.props;

        if (message) {
            actions.createTaskAsync(message);
        }
    };

    _checkAllDone = () => {
        const { tasks } = this.props;

        return tasks.every((task) => task.get('completed')) && tasks.length > 0;
    };

    _handleCompleteTasks = () => {
        if (!this._checkAllDone()) {
            this.props.actions.completeTasksAsync();
        }
    };

    _handleSubmit = (event) => {
        event.preventDefault();
        this._createTask();
    };

    render () {
        const { tasks, searchKeyword, isTasksFetching } = this.props;
        const todoList = tasks
            .filter((task) => task.get('message').toLowerCase().match(searchKeyword.toLowerCase()))
            .map((task) => (
                <Task
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    key = { task.get('id') }
                    message = { task.get('message') }
                    { ...task }
                />
            ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Control.text
                            model = 'forms.search.message'
                            placeholder = 'Поиск'
                            type = 'search'
                        />
                    </header>
                    <section>
                        <form
                            onSubmit = { this._handleSubmit }>
                            <Control.text
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = 'forms.create.message'
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <Move
                                    duration = { 400 }
                                    easing = 'ease-in-out'>
                                    { todoList }
                                </Move>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { this._checkAllDone() }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._handleCompleteTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
