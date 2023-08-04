import { useState, useEffect } from "react";
import "./alarm.css";

const AlarmApp = () => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: "AM",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAlarm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddAlarm = () => {
    const { hours, minutes, seconds } = newAlarm;

     if (newAlarm.hours === 0 || newAlarm.minutes === 0 ) {
      alert("Please set a valid alarm time. Hours, minutes, and seconds cannot be 0.");
      return;
    }

    if (hours > 24 || hours < 0) {
      alert("Invalid hour. Please enter a valid hour (0-24).");
      return;
    }

    if (minutes >= 60 || minutes < 0) {
      alert("Invalid minutes. Please enter a valid value (0-59).");
      return;
    }

    if (seconds >= 60 || seconds < 0) {
      alert("Invalid seconds. Please enter a valid value (0-59).");
      return;
    }

    setAlarms([...alarms, newAlarm]);
    setNewAlarm({
      hours: 0,
      minutes: 0,
      seconds: 0,
      ampm: "AM",
    });
  };

  const handleDeleteAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
  };

  const checkAlarms = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();

    alarms.forEach((alarm) => {
      const { hours, minutes, seconds, ampm } = alarm;
      let alarmTime = hours * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
      if (ampm === "PM") {
        alarmTime += 12 * 60 * 60;
      }
      if (alarmTime === currentTime) {
        alert("Alarm Reminder: Time to wake up!");
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <center>
      <div className="alarm-app">
        <h1 id="title">Alarms</h1>
        <div className="alarm-list">
          {alarms.map((alarm, index) => (
            <div key={index} className="alarm-item">
              <span>
                {alarm.hours}:{alarm.minutes}:{alarm.seconds} {alarm.ampm}
              </span>
              <button onClick={() => handleDeleteAlarm(index)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="add-alarm">
          <label>
            Hours:
            <input
              type="number"
              name="hours"
              value={newAlarm.hours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              name="minutes"
              value={newAlarm.minutes}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Seconds:
            <input
              type="number"
              name="seconds"
              value={newAlarm.seconds}
              onChange={handleInputChange}
            />
          </label>
          <label>
            AM/PM:
            <select name="ampm" value={newAlarm.ampm} onChange={handleInputChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </label>
          <button onClick={handleAddAlarm}>Add Alarm</button>
        </div>
      </div>
    </center>
  );
};

export default AlarmApp;
