import React from "react";
import PrayerTimeFinderShia from "../HelperFunctions/PrayerTimeFinderShia";
import Clock from "react-clock";

class PrayerTime extends React.Component {
  state = {
    MonthsPrayerTimes: [],
    nextMonthsPrayerTime: [],
    date: new Date(),
    tehranTime: new Date()
  };

  getMonthPrayingTime = (month, year) => {
    let myPrayerTimes = new PrayerTimeFinderShia();
    myPrayerTimes.findPrayerTime(
      this.props.latitude,
      this.props.longitude,
      month,
      year,
      prayerTimes => {
        if (month !== new Date().getMonth()) {
          this.setState({
            nextMonthsPrayerTime: prayerTimes
          });
        } else {
          this.setState({
            MonthsPrayerTimes: prayerTimes
          });
        }
      }
    );
  };

  getTwoMonthPrayerTime() {
    if (this.state.MonthsPrayerTimes && 1) {
      let myDate = new Date();
      this.getMonthPrayingTime(myDate.getMonth(), myDate.getFullYear());

      if (myDate.getMonth() < 11) {
        this.getMonthPrayingTime(myDate.getMonth() + 1, myDate.getFullYear());
      } else {
        this.getMonthPrayingTime(0, myDate.getFullYear() + 1);
      }
    }
  }
  componentDidMount() {
    this.getTwoMonthPrayerTime();
    setInterval(() => {
      this.setState({ date: new Date() });

      let currSumTime =
        60 * parseInt(new Date().getHours()) +
        parseInt(new Date().getMinutes());

      let nextPrayerTime = this.myNextPrayerTime(
        this.state.MonthsPrayerTimes[new Date().getDate() - 1]
      );

      if (
        nextPrayerTime - currSumTime >= 0 &&
        nextPrayerTime - currSumTime < 2
      ) {
        this.props.playAzan(true);
      }
    }, 1000);
    setInterval(() => this.setState({ tehranTime: this.calcTime(4.5) }), 1000);

    setInterval(() => this.getTwoMonthPrayerTime(), 36000000);
  }

  calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    return nd;
  }

  myNextPrayerTime(dayPrayerTime) {
    if (dayPrayerTime.date != null)
      if (new Date().getDate() === parseInt(dayPrayerTime.date.gregorian.day)) {
        let myListOfTimes = [];
        //myListOfTimes.push(dayPrayerTime.timings.Imsak);
        //myListOfTimes.push(dayPrayerTime.timings.Fajr);
        //myListOfTimes.push(dayPrayerTime.timings.Sunrise);
        myListOfTimes.push(dayPrayerTime.timings.Dhuhr);
        //myListOfTimes.push(dayPrayerTime.timings.Sunset);
        myListOfTimes.push(dayPrayerTime.timings.Maghrib);

        let minTime = 4000;
        let currSumTime =
          60 * parseInt(new Date().getHours()) +
          parseInt(new Date().getMinutes());

        for (let i = 0; i < myListOfTimes.length; i++) {
          let sumTime =
            60 * parseInt(myListOfTimes[i].split(" ")[0].split(":")[0]) +
            parseInt(myListOfTimes[i].split(" ")[0].split(":")[1]);

          if (sumTime - currSumTime < minTime && sumTime - currSumTime > 0) {
            minTime = Math.abs(currSumTime - sumTime);

            return sumTime;
          }
        }
      }
  }

  render() {
    let prayerTimeStyler = "";
    if (this.state.MonthsPrayerTimes && this.state.nextMonthsPrayerTime) {
      let myTwoMonth = this.state.MonthsPrayerTimes.concat(
        this.state.nextMonthsPrayerTime
      );
      prayerTimeStyler = myTwoMonth.map(dayPrayerTime => {
        let todayStyler = "";
        let timeStyler = [];
        timeStyler.push("Imsak");
        timeStyler.push("Fajr");
        timeStyler.push("Sunrise");
        timeStyler.push("Noon");
        timeStyler.push("Sunset");
        timeStyler.push("Maghrib");

        if (
          new Date().getDate() === parseInt(dayPrayerTime.date.gregorian.day)
        ) {
          let myListOfTimes = [];
          myListOfTimes.push(dayPrayerTime.timings.Imsak);
          myListOfTimes.push(dayPrayerTime.timings.Fajr);
          myListOfTimes.push(dayPrayerTime.timings.Sunrise);
          myListOfTimes.push(dayPrayerTime.timings.Dhuhr);
          myListOfTimes.push(dayPrayerTime.timings.Sunset);
          myListOfTimes.push(dayPrayerTime.timings.Maghrib);
          let minTime = 4000;
          let minIndex = 0;
          let currSumTime =
            60 * parseInt(new Date().getHours()) +
            parseInt(new Date().getMinutes());

          for (let i = 0; i < myListOfTimes.length; i++) {
            let sumTime =
              60 * parseInt(myListOfTimes[i].split(" ")[0].split(":")[0]) +
              parseInt(myListOfTimes[i].split(" ")[0].split(":")[1]);

            if (sumTime - currSumTime < minTime && sumTime - currSumTime > 0) {
              minTime = Math.abs(currSumTime - sumTime);
              minIndex = i;
            }
          }
          timeStyler[minIndex] = timeStyler[minIndex] + " Now";
          todayStyler = "today-date";
        }

        return (
          <div
            key={dayPrayerTime.date.readable}
            className={`ui ${todayStyler} card`}
          >
            <div className="content">
              <div className="header">
                {dayPrayerTime.date.gregorian.weekday.en}
              </div>
              <div className="meta">{dayPrayerTime.date.readable}</div>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Time Of Day</th>
                    <th>Prayer Time</th>
                  </tr>
                  <tr className={`${timeStyler[0]}`}>
                    <td data-label="Time Of Day">
                      <strong>Imsak</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Imsak}
                    </td>
                  </tr>
                  <tr className={`${timeStyler[1]}`}>
                    <td data-label="Time Of Day">
                      <strong>Fajr</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Fajr}
                    </td>
                  </tr>
                  <tr className={`${timeStyler[2]}`}>
                    <td data-label="Time Of Day">
                      <strong>Sunrise</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Sunrise}
                    </td>
                  </tr>
                  <tr className={`${timeStyler[3]}`}>
                    <td data-label="Time Of Day">
                      <strong>Noon</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Dhuhr}
                    </td>
                  </tr>
                  <tr className={`${timeStyler[4]}`}>
                    <td data-label="Time Of Day">
                      <strong>Sunset</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Sunset}
                    </td>
                  </tr>
                  <tr className={`${timeStyler[5]}`}>
                    <td data-label="Time Of Day">
                      <strong>Maghrib</strong>
                    </td>
                    <td data-label="Prayer Time">
                      {dayPrayerTime.timings.Maghrib}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        );
      });
      let todaysDate = new Date().getDate();
      prayerTimeStyler = prayerTimeStyler.slice(todaysDate - 1, todaysDate + 2);

      prayerTimeStyler.push(
        <div key="localTime" className="ui card">
          <div className="content">
            <div className="header">Local Time:</div>
            <Clock className="clock" value={this.state.date} />
            <div className="header">Tehran Time:</div>
            <Clock className="clock" value={this.state.tehranTime} />
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.state && this.state.MonthsPrayerTimes && (
          <div className="ui cards"> {prayerTimeStyler} </div>
        )}
      </div>
    );
  }
}

export default PrayerTime;
