import React from "react";

import ReactPlayer from "react-player";

import CoordinateFinder from "../HelperFunctions/CoordinateFinder";
import PrayerTime from "./PrayerTime";
import WeatherRefresher from "./WeatherRefresher";

class Main extends React.Component {
  state = {
    longitude: "",
    latitude: "",
    date: new Date(),
    playAzan: false,
    playerURL:
      "https://soundcloud.com/aljaafaria-centre/beautiful-shia-azan-by-sayed"
  };

  componentDidMount() {
    this.setCoordinates();
  }

  setCoordinates = () => {
    let myCoordinates = new CoordinateFinder();
    myCoordinates.getCoordinates(coordinates => {
      this.setState({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      });
    });
  };
  ref = player => {
    this.player = player;
  };
  refPlayerText = playerText => {
    this.playerText = playerText;
  };
  render() {
    return (
      <div className="overall">
        <div className="ui equal width center aligned padded grid">
          {this.state && this.state.longitude && this.state.latitude && (
            <div className="row">
              <div className="column">
                <PrayerTime
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  playAzan={shouldPlay =>
                    this.setState({ playAzan: shouldPlay })
                  }
                />
              </div>
            </div>
          )}
          {this.state && this.state.longitude && this.state.latitude && (
            <div className="row">
              <div className="column">
                <WeatherRefresher
                  forecast="5days"
                  apikey="c1649867e0f4434fb55224755191905"
                  type="geo"
                  lat={this.state.latitude.toString()}
                  lon={this.state.longitude.toString()}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="column">
              <ReactPlayer
                className="player"
                ref={this.ref}
                controls={true}
                width="200px"
                height="80px"
                url={this.state.playerURL}
                playing={this.state.playAzan}
                onEnded={() => {
                  this.setState({ playAzan: false });
                  this.player.seekTo(0);
                }}
              />
              <div className="ui input">
                <input
                  ref={this.refPlayerText}
                  type="text"
                  placeholder="URL..."
                />
              </div>
              <button
                className="ui primary button"
                onClick={() =>
                  this.setState({ playerURL: this.playerText.value })
                }
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
