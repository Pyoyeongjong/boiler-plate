import { combineReducers } from 'redux';
import user from './user_reducer';
// 여러 reducers를 하나로 합치는 기능!
const rootReducer = combineReducers({
    user
})

export default rootReducer;