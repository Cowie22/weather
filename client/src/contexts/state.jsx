import Axios from "axios"
import React, { Component } from "react"

// This is the main function that allows contexts to work and is built in to react.
// AppContext will have AppContext.Provider, which is used here and will also have
// AppContext.Consumer, which allows the global state to be used throughout the app.
// Hence why AppContext is exported as well as the class component below.

const defaultState = {
  currentLat: '',
  currentLong: '',
  handleLatLongChange: () => {},
  handleDropdownLongLat: () => {},
  handleLongLatFromMap: () => {},
  weatherData: [],
  currentCity: '',
  cities: [],
  lastCity: {},
  dataCollectedFirstTime: false,
  getWeatherData: () => {},
  getWeatherDataFirstTime: () => {},
  getCity: () => {},
  addCity: () => {},
}

export const AppContext = React.createContext(defaultState)
class AppProvider extends Component {
  constructor(props) {
    super(props)
    // With context, this.state will have the state that needs to be shared amongst multiple
    // Components in the app, but it is important to note that this.state also contains
    // The functions that are responsible for changing the state.  In order to maintain readability,
    // I have seen that many engineers indent the function, directly below the state or states that
    // That particular function is responsible for updating.
    this.state = {
      currentLat: '',
      currentLong: '',
      handleLatLongChange: (event) => {
        let newState = {};
        newState[event.target.name] = event.target.value,
        this.setState(newState);
      },
      handleDropdownLongLat: (lat, long) => {
        this.setState({
          currentLat: lat,
          currentLong: long,
        })
      },
      handleLongLatFromMap: (event) => {
        this.setState({
          currentLat: event.lat.toFixed(4),
          currentLong: event.lng.toFixed(4),
          // mapClicked: true,
        }, () => {
          this.state.getWeatherData(this.state.currentLat, this.state.currentLong)
        });
      },
      weatherData: [],
      currentCity: '',
      cities: [],
      lastCity: {},
      dataCollectedFirstTime: false,
      getWeatherData: (lat, long) => {
        Axios.get(`/weather/${lat}/${long}`)
          .then(res => {
            this.setState({
              weatherData: res.data,
              currentCity: res.data.title,
            })
          })
          .then(() => {
            let info = {
              postLat: lat,
              postLong: long,
              postCity: this.state.currentCity,
            };
            this.state.addCity(info);
          })
          .catch(err => {
            console.log('ERROR', err)
            alert('PLEASE INSERT PROPER LATITUDE AND LONGITUDE')
          });
      },
      getWeatherDataFirstTime: (lat, long) => {
        Axios.get(`/weather/${lat}/${long}`)
          .then(res => {
            this.setState({
              weatherData: res.data,
              currentCity: res.data.title,
              dataCollectedFirstTime: true,
            })
          })
          .catch(err => {
            console.log('ERROR', err)
            alert('PLEASE INSERT PROPER LATITUDE AND LONGITUDE')
          });
      },
      getCity: () => {
        Axios.get(`/city`)
          .then(res => {
            this.setState({
              cities: res.data,
              lastCity: res.data[0],
            })
          })
          .then(() => {
            if (!this.state.dataCollectedFirstTime) {
              const { latitude, longitude} = this.state.lastCity;
              this.state.getWeatherDataFirstTime(latitude, longitude);
            }
            return
          })
          .catch(err => {
            console.log('ERROR', err)
          });
      },
      addCity: (info) => {
        Axios.post(`/city`, info)
          .then(this.state.getCity())
          .catch(err => {
            console.log('ERROR', err)
          });
      }
    }
  }
  render() {
    // AppContext.Provider is a built in function for context, it is important that
    // this.props.children is used and to note that this.state is passed in.

    // The class AppProvider will then wrap the outermost component(s) in the app.
    // For Gatsby, there is a special way to handle this, and the wrapper will be
    // Used in gatsby-browser.js and gatsby-ssr.js.
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}


export default AppProvider
