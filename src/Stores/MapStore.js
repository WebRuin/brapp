import { EventEmitter } from "events";
import firebase, { auth, provider } from "../firebase";

import dispatcher from "../dispatcher";
import geocoder from "geocoder";

class MapStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.toggleAddBathroomFormState = this.toggleAddBathroomFormState.bind(this)
    this.state = {
      isAddBathroomFormOpen: false,
      coords: [],
      user: null
    };  
    this.getUser = this.getUser.bind(this);
    this.addBathroom = this.addBathroom.bind(this);
  } 

  getAll() {
    return this.state.coords;
  }

  getUser() {
    let self = this;
    let newUser = null;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        newUser: user;
      } 
    });
    this.state.user = newUser;
    return this.state.user;
  }

  setAddBathroomFormState() {
    return this.state.isAddBathroomFormOpen
  }

  addBathroom(bathroom) {
    let self = this;
    geocoder.geocode(bathroom.address, function ( err, data ) {
      const itemsRef = firebase.database().ref('items');
      const item = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        name: bathroom.name,
        user: self.state.user
      }
      console.table(item);
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
      case "GET_USER": {
        this.getUser();
      }
      default: {
        break;
      }
    }
  }

}

const mapStore = new MapStore;
dispatcher.register(mapStore.handleActions.bind(mapStore));

export default mapStore;