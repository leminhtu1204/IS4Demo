import { combineReducers } from "redux";
import { accountReducers } from "../Views/AccountManagement/UserManagement/reducers";
import { commonReducers } from "./Common";
import {authenticationReducers} from '../Views/Authentication/reducers/index'
import {loadingReducers} from './Loading'

export const rootReducer = combineReducers({
  account: accountReducers,
  common: commonReducers,
  authentication: authenticationReducers,
  loading: loadingReducers
});

export type AppState = ReturnType<typeof rootReducer>;
