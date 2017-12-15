import dispatcher from "../dispatcher";

export function addBathroom(bathroom) {
  dispatcher.dispatch({
    type: "ADD_BATHROOM",
    bathroom
  });
}

export function fetchCoords() {
  dispatcher.dispatch({
    type: "FETCH_COORDS"
  });
}