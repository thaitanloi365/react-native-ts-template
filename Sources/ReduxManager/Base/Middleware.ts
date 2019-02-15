import logger from "redux-logger";
import thunk from "redux-thunk";

let m = [thunk];
if (__DEV__) {
  m.push(logger);
}
export const middlewares = m;
