import { combineReducers } from 'redux';
import MainFormReducer from './MainFormReducer';
import MainContainerReducer from './MainContainerReducer';

const rootReducer = combineReducers({
    MainContainerReducer,
    MainFormReducer
});

export default rootReducer;
