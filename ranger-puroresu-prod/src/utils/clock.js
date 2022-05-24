class Clock {
  static render = (elem) => {
    const time12 = () => {
      const date = new Date();
      const hours = date.getHours();
      const minute = date.getMinutes();
      const seconds = date.getSeconds();
      const meridiem = hours <= 12 ? "AM" : "PM";
      const timeString = `${
        hours > 12 || hours === 0 ? Math.abs(hours - 12) : "0" + hours
      }:${minute < 10 ? "0" + minute : minute}:${
        seconds < 10 ? "0" + seconds : seconds
      } ${meridiem}`;
      elem.textContent = timeString;
      return hours;
    };
    setInterval(time12, 100);
    return time12();
  };
}

export { Clock };
