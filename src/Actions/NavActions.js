import dispatcher from "../dispatcher";

export function getUser() {
  dispatcher.dispatch({
    type: "GET_USER"
  });
}