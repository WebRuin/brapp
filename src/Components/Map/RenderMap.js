import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BathroomMarker from './BathroomMarker';
import MapStore from "../../Stores/MapStore";
import firebase, { auth, provider } from "../../firebase";


import './renderMap.css'

export default class RenderMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: [],
      mapCenter: { lat:37.5670279, lng:-122.3238017 },
      mapZoom: 15,
      user: null
    }

    this.getCoords = this.getCoords.bind(this)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          lat: items[item].lat,
          lng: items[item].lng,
          name: items[item].name
        });
      }
      this.setState({
        coords: newState
      });
    });

    if ("geolocation" in navigator) {
      let self = this
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('set location')
        self.setState({
          mapCenter: { lat: position.coords.latitude, lng:position.coords.longitude }
        })
      });
    } else {
      console.log('not set')
    }

    this.setState({
      mapZoom: 15,
    })
    MapStore.on("change", this.getCoords);
  }

  componentWillUnmount() {
    MapStore.removeListener("change", this.getCoords);
  }

  getCoords() {
    this.setState({
      coords: MapStore.getAll(),
    });
  }

  render() {
    let mapCoords = this.state.coords.map((mapCoord, index) =>
      <BathroomMarker
        style={ { height: "30px", width: "160px" } }
        key={ index }
        lat={ mapCoord.lat }
        lng={ mapCoord.lng }
        name={ mapCoord.name }
      />
    )
    return (
      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDSuCrywX_-TbCb-0zQrrQ0W8ksCc8jL-U' }}
          defaultCenter={{ lat:37.5670279, lng:-122.3238017 }}
          center={ this.state.mapCenter }
          defaultZoom={ this.state.mapZoom }>
          { mapCoords }
        </GoogleMapReact>
      </div>
    )
  }
}
