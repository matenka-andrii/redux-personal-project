// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from 'theme/assets/Checkbox';
import Remove from 'theme/assets/Remove';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends PureComponent {
    state = {
        isEditing: false,
    };

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
        const { isEditing } = this.state;

        this.setState({ isEditing: !isEditing });
    };

    _handleKeyDown = (event) => {
        const { value } = event.target;
        const { actions, id, message, completed, favorite } = this.props;

        if (event.key === 'Escape') {
            this.setState({ isEditing: false });
        } else if (event.key === 'Enter') {
            if (value.trim() !== message) {
                actions.updateTaskAsync({
                    id,
                    completed,
                    favorite,
                    message: value.trim(),
                });
            }
            this.setState({ isEditing: false });
        }
    };

    _handleTextInputChange = (event) => {
        const value = event.target.value.replace(/ +(?= )/g, '');

        if (value.length <= 50) {

        }
    };

    render () {
        const { isEditing } = this.state;
        const { message, completed, favorite } = this.props;
        const text = isEditing ? (
            <input
                autoFocus
                type = 'text'
                value = { message }
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
                    { text }
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
