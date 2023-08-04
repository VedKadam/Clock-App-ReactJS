import { useState, useEffect } from 'react';
import "./clock.css";

  export default function Clock() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = (hours % 12) || 12;
      const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
      const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

      setCurrentTime(displayHours + ' : ' + displayMinutes + ' : ' + displaySeconds + ' : ' + amOrPm);
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <center>
      <h1 id='title'>Clock By <span class="hollo-text"> Vedant </span></h1>
      <h1 className="time">{currentTime}</h1>
    </center>
  );
}
