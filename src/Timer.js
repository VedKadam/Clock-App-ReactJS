import React, { useState, useRef } from "react";
import "./ctimer.css"; 

const Timer = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [running, setRunning] = useState(false);
  const countdownRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTime((prevState) => ({ ...prevState, [name]: parseInt(value) }));
  };

  const handleStart = () => {
    if (!running) {
      setRunning(true);
      let totalMilliseconds =
        time.hours * 3600000 +
        time.minutes * 60000 +
        time.seconds * 1000 +
        time.milliseconds;
      let interval = 10; 
      countdownRef.current.innerText = ""; 
      const timer = setInterval(() => {
        if (totalMilliseconds <= 0) {
          clearInterval(timer);
          setRunning(false);
          countdownRef.current.innerText = "Countdown Ended"; 
        } else {
          totalMilliseconds -= interval;
          let newTime = {
            hours: Math.floor(totalMilliseconds / 3600000),
            minutes: Math.floor((totalMilliseconds % 3600000) / 60000),
            seconds: Math.floor((totalMilliseconds % 60000) / 1000),
            milliseconds: totalMilliseconds % 1000,
          };
          setTime(newTime);
        }
      }, interval);

      countdownRef.current.timer = timer;
    }
  };
  

  
  const handleStop = () => {
    if (running) {
      clearInterval(countdownRef.current.timer); 
      setRunning(false);
      countdownRef.current.innerText = "Countdown Stopped"; 
    }
  };

 
  const handleReset = () => {
    setRunning(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    countdownRef.current.innerText = ""; 
  };

  return (
    <center>
        
      <div className="countdown-timer">
      <h1 id="title"> Countdown Timer </h1>
        <div className="input-container">
          <label>
            Hours:
            <input
              type="number"
              name="hours"
              value={time.hours}
              onChange={handleInputChange}
              disabled={running}
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              name="minutes"
              value={time.minutes}
              onChange={handleInputChange}
              disabled={running}
            />
          </label>
          <label>
            Seconds:
            <input
              type="number"
              name="seconds"
              value={time.seconds}
              onChange={handleInputChange}
              disabled={running}
            />
          </label>
          <label>
            Milliseconds:
            <input
              type="number"
              name="milliseconds"
              value={time.milliseconds}
              onChange={handleInputChange}
              disabled={running}
            />
          </label>
        </div>
        <div className="button-container">
          <button onClick={handleStart} disabled={running}>
            Start
          </button>
          <button onClick={handleStop} disabled={!running}>
            Stop
          </button>
          <button onClick={handleReset} disabled={running}>
            Reset
          </button>
        </div>
        <h1 ref={countdownRef}></h1>
      </div>
    </center>
  );
};

export default Timer;
