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
    render () {
        const { message, completed } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        className = { Styles.complete }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                    />
                    <input disabled type = 'text' value = { message } />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked
                        inlineBlock
                        className = { Styles.setPriority }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.edit }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.remove }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                </div>
            </li>
        );
    }
}
