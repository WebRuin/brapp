import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import style from './renderMap.css'

const AnyReactComponent = ({ name }) => <div>{ name }</div>;
export default class RenderMap extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 11
  }

constructor(props) {
  super(props)
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
  }
}

render() {
    let mapCoords = this.state.coords.map((mapCoord, index) =>
      <AnyReactComponent
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