// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Spinner extends Component {
    render () {
        const { spin } = this.props;

        return spin ? <div className = { Styles.spin } /> : null;
    }
}
