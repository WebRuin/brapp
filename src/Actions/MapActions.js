import dispatcher from "../dispatcher";

export function addBathroom(bathroom) {
  dispatcher.dispatch({
    type: "ADD_BATHROOM",
    bathroom
  });
}

export function toggleAddBathroomFormState() {
  dispatcher.dispatch({
    type: "TOGGLE_ADD_BATHROOM_STATE",
  });
}

export function fetchCoords() {
  dispatcher.dispatch({
    type: "FETCH_COORDS",
  });
}

export function getData() {
  dispatcher.dispatch({
    type: "GET_DATA",
  });
}