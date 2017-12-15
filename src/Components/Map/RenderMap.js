import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import BathoomMarker from './BathoomMarker'
import * as MapActions from "../../Actions/MapActions";
import MapStore from "../../Stores/MapStore";

import style from './renderMap.css'


export default class RenderMap extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 11
  }

  constructor(props) {
    super(props)
    this.state = {
      coords: MapStore.getAll(),
    }
  }

  componentWillMount() {
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
      <BathoomMarker
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
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          { mapCoords }
        </GoogleMapReact>
      </div>
    )
  }
}