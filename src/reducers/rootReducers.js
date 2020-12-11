import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import employeesReducers from '../screens/employee/reducers'

const rootReducer = combineReducers({
    employeesReducers,
    form: formReducer,
});

export default rootReducer;