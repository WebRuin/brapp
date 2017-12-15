import dispatcher from "../dispatcher";

export function addBathroom(bathroom) {
  dispatcher.dispatch({
    type: "ADD_ENTRY",
    bathroom
  });
}

export function fetchCoords() {
  dispatcher.dispatch({
    type: "FETCH_COORDS"
  });
}