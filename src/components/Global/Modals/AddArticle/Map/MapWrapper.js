import React, {Component} from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Marker from './Marker';
import {KEYS} from '../../../../../Key';

const mapStateToProps = state => ({
    user: state.user,
    mapReducer: state.mapReducer,
    articleReducer: state.articleReducer
  });


// this is the component that goes around the google map. this component is curried at the bottom with
// the GoogleApiWrapper. this feeds it the prop 'google' which is necessary for the rest of the components
export class Container extends Component{

    constructor(props){
        super(props);
        this.state = {
          
        }
      }
  
      render(){
          
          return (
            <div>
              <Map initialCenter={this.props.initialCenter} google={this.props.google}>
                <Marker position={{lat: this.props.initialCenter.lat, lng: this.props.initialCenter.lng}} />
              </Map>
            </div>
          
        )
        }
      }

export default compose(connect(mapStateToProps),GoogleApiWrapper({
  apiKey: KEYS.GOOGLE_API_KEY,
  v: "3"
}))(Container);