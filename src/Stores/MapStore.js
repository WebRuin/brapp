import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import geocoder from "geocoder";

class BankStore extends EventEmitter {
  constructor() {
    super()
    this.state = {
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

  addBathroom(bathroom) {
    geocoder.geocode("bathroom.address", function ( err, data ) {
      console.log(data);
    });
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_BATHROOM": {
        this.addBathroom(action.data);
        break;
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
