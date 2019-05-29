import React from "react";
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";
class WeatherRefresher extends React.Component {
  state = {
    refreshFlag: false
  };
  componentDidMount() {
    setInterval(
      () => this.setState({ refreshFlag: !this.state.refreshFlag }),
      36000000
    );
  }
  render() {
    return (
      <ReactWeather
        forecast={this.props.forecast}
        apikey={this.props.apikey}
        type={this.props.type}
        lat={this.props.lat}
        lon={this.props.lon}
        tick={this.state.refreshFlag}
      />
    );
  }
}
export default WeatherRefresher;
