import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import adminAuth from './adminAuth';
import profile from './profile';
import opinions from './opinions';
import agencyProfile from './agencyProfile';

export default combineReducers({
	alert,
	auth,
	profile,
	adminAuth,
	opinions,
	agencyProfile
});
