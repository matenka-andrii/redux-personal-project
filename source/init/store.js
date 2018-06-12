// Core
import { createStore, applyMiddleware, compose } from 'redux';

// Instruments
import { rootReducer } from './rootReducer';
import { sagaMiddleware, middleware, dev } from './middleware';
import { rootSaga } from './rootSaga';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

export { store };

sagaMiddleware.run(rootSaga);
