class CoordianteFinder {
  getCoordinates = callback => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );
  };
}

export default CoordianteFinder;
