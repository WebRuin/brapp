import React, { Component } from 'react'
import style from './renderMap.css'

export default class BathoomMarker extends Component {
  render() {
    let bathroomMarker_Name_Open = this.props.$hover ? 'bathroomMarker--name' : 'bathroomMarker--name__closed'

    return (
      <div className='bathroomMarker'>
        <div className='bathroomMarker--img'></div>
        <div className={bathroomMarker_Name_Open}>{ this.props.name }</div>
      </div>
    )
  }
}