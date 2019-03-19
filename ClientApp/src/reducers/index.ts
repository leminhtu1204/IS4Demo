import { combineReducers } from "redux";
import { accountReducers } from "./Account";
import { commonReducers } from "./Common";

export const rootReducer = combineReducers({
  account: accountReducers,
  common: commonReducers
});

export type AppState = ReturnType<typeof rootReducer>;
