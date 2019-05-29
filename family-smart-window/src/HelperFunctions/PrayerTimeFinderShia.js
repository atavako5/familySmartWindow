import Axios from "axios";
class PrayerTimeFinderShia {
  findPrayerTime = (latitude, longitude, month, year, callback) => {
    Axios.get("http://api.aladhan.com/v1/calendar", {
      params: {
        latitude: latitude,
        longitude: longitude,
        method: 0,
        month: month + 1,
        year: year
      }
    }).then(response => {
      callback(response.data.data);
    });
  };
}
export default PrayerTimeFinderShia;
