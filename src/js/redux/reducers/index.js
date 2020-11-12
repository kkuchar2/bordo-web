import { combineReducers } from 'redux';

import { navbarReducer } from './navbar.reducer';

const rootReducer = combineReducers({
    navbarReducer
});

export default rootReducer;