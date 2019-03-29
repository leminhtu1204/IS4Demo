import { combineReducers } from "redux";
import { accountReducers } from "./Account";
import { commonReducers } from "./Common";
import {authenticationReducers} from './Authentication'
import {loadingReducers} from './Loading'

export const rootReducer = combineReducers({
  account: accountReducers,
  common: commonReducers,
  authentication: authenticationReducers,
  loading: loadingReducers
});

export type AppState = ReturnType<typeof rootReducer>;
