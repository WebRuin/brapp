import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import geocoder from "geocoder";
import firebase from "../firebase";

class MapStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.toggleAddBathroomFormState = this.toggleAddBathroomFormState.bind(this)
    this.state = {
      isAddBathroomFormOpen: false,
      coords: []
    };
  } 

  getAll() {
    return this.state.coords;
  }

  setAddBathroomFormState() {
    return this.state.isAddBathroomFormOpen
  }

  addBathroom(bathroom) {
    geocoder.geocode(bathroom.address, function ( err, data ) {
      const itemsRef = firebase.database().ref('items');
      const item = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        name: bathroom.name
      }
      itemsRef.push(item);
    });
    this.emit("change");
    this.toggleAddBathroomFormState()
  }

  toggleAddBathroomFormState() {
    this.state.isAddBathroomFormOpen = !this.state.isAddBathroomFormOpen;
    this.emit("change");
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_BATHROOM": {
        this.addBathroom(action.bathroom);
        break;
      }
      case "TOGGLE_ADD_BATHROOM_STATE": {
        this.toggleAddBathroomFormState();
        break
      }
      case "FETCH_COORDS": {
        this.fetchCoords();
        break;
      }
    }
  }

}

const mapStore = new MapStore;
dispatcher.register(mapStore.handleActions.bind(mapStore));

export default mapStore;