// Core
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { taskActions } from 'bus/task/actions';
import { tasksActionsAsync } from 'bus/tasks/saga/asyncActions';

// Components
import Checkbox from 'theme/assets/Checkbox';
import Remove from 'theme/assets/Remove';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

const mapStateToProps = (state) => {
    return {
        editingTaskId:  state.task.get('editingTaskId'),
        editingTaskMsg: state.task.get('editingTaskMsg'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                deleteTaskAsync: tasksActionsAsync.deleteTaskAsync,
                updateTaskAsync: tasksActionsAsync.updateTaskAsync,
                setTaskIdState:  taskActions.setTaskIdState,
                setTaskMsgState: taskActions.setTaskMsgState,
            },
            dispatch,
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
export default class Task extends PureComponent {

    _completeTask = () => {
        const { actions, id, message, completed, favorite } = this.props;

        actions.updateTaskAsync({
            id,
            message,
            completed: !completed,
            favorite,
        });
    };

    _deleteTask = () => {
        const { actions, id } = this.props;

        actions.deleteTaskAsync(id);
    };

    _favoriteTask = () => {
        const { actions, id, message, completed, favorite } = this.props;

        if (!completed) {
            actions.updateTaskAsync({
                id,
                message,
                completed,
                favorite: !favorite,
            });
        }
    };

    _handleEditing = () => {
        const { actions, id, message, editingTaskId } = this.props;

        if (editingTaskId === id) {
            actions.setTaskIdState('');
            actions.setTaskMsgState('');
        } else {
            actions.setTaskIdState(id);
            actions.setTaskMsgState(message);
        }
    };

    _handleKeyDown = (event) => {
        const { actions, id, message, completed, favorite, editingTaskMsg } = this.props;

        if (event.key === 'Escape') {
            actions.setTaskIdState('');
            actions.setTaskMsgState('');
        } else if (event.key === 'Enter') {
            if (editingTaskMsg !== message) {
                actions.updateTaskAsync({
                    id,
                    completed,
                    favorite,
                    message: editingTaskMsg,
                });
            }
            actions.setTaskIdState('');
            actions.setTaskMsgState('');
        }
    };

    _handleTextInputChange = (event) => {
        const { actions } = this.props;
        const value = event.target.value;

        if (value.length <= 50) {
            actions.setTaskMsgState(value);
        }
    };

    render () {
        const { id, message, completed, favorite, editingTaskId, editingTaskMsg } = this.props;
        const taskMsg = id === editingTaskId ? (
            <input
                autoFocus
                type = 'text'
                value = { editingTaskMsg }
                onChange = { this._handleTextInputChange }
                onKeyDown = { this._handleKeyDown }
            />
        ) : <p> { message } </p>;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.complete }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._completeTask }
                    />
                    { taskMsg }
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.setPriority }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        disabled = { completed }
                        onClick = { this._favoriteTask }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.edit }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        disabled = { completed }
                        onClick = { this._handleEditing }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.remove }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._deleteTask }
                    />
                </div>
            </li>
        );
    }
}
