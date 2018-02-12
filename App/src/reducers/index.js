import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UsersReducer from './UsersReducer';
import UserCheckinReducer from './UserCheckinReducer';
// import currentUserReducer from './currentUserReducer';

export default combineReducers({
   auth: AuthReducer,
   users: UsersReducer,
   usercheckin: UserCheckinReducer,
   // userdb: currentUserReducer
});
