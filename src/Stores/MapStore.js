import { EventEmitter } from "events";

import uuid from "uuid-v4";
import dispatcher from "../dispatcher";
import geocoder from "geocoder";

class BankStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.toggleAddBathroomFormState = this.toggleAddBathroomFormState.bind(this)
    this.state = {
      isAddBathroomFormOpen: false,
      coords: [
        {
          lat: 23.5958633,
          lng: 120.2858846,
          name: "White-rumped vulture"
        }, {
          lat: 48.4990903,
          lng: 7.3118635,
          name: "White-eye, pale"
        }, {
          lat: 48.6144697,
          lng: 24.5234182,
          name: "Magpie, australian"
        }, {
          lat: 5.3268119,
          lng: 132.2239117,
          name: "Rattlesnake, dusky"
        }, {
          lat: 31.7311971,
          lng: 117.2313179,
          name: "Otter, north american river"
        }, {
          lat: 6.1898099,
          lng: -73.57585,
          name: "Ring-necked pheasant"
        }, {
          lat: 55.8174294,
          lng: 37.3727638,
          name: "African buffalo"
        }, {
          lat: 45.8068679,
          lng: 15.8104824,
          name: "Hyena, brown"
        }, {
          lat: 34.293171,
          lng: 108.946651,
          name: "Wolf, timber"
        }, {
          lat: 14.5909643,
          lng: 121.0944813,
          name: "Nile crocodile"
        }
      ]
    };
  }

  getAll() {
    return this.state.coords;
  }

  setAddBathroomFormState() {
    return this.state.isAddBathroomFormOpen
  }

  addBathroom(bathroom) {
    let th = this
    geocoder.geocode(bathroom.address, function ( err, data ) {
      th.state.coords.push({
        bathroomID: uuid(),
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        name: bathroom.name
      })
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

const bankStore = new BankStore;
dispatcher.register(bankStore.handleActions.bind(bankStore));

export default bankStore;
