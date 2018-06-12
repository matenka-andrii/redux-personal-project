// Core
import { combineForms } from 'react-redux-form';

export const formsReducer = combineForms(
    {
        create: {
            message: '',
        },
        search: {
            message: '',
        },
    },
    'forms',
);
