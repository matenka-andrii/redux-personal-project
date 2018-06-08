// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
    render () {
        return (
            <h1
                style = { {
                    display:        'flex',
                    color:          'white',
                    height:         '100vh',
                    justifyContent: 'center',
                    alignItems:     'center',
                } }>
                Начало здесь
            </h1>
        );
    }
}
