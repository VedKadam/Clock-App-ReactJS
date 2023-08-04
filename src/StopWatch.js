import { useEffect, useState } from "react";
import "./stopwatch.css";

export default function StopWatch() {
    const [milliseconds, setMilliseconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timer;

    useEffect(() => {
        if (isRunning) {
            timer = setInterval(() => {
                setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);

                if (milliseconds >= 990) {
                    setMilliseconds(0);
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }

                if (seconds === 60) {
                    setSeconds(0);
                    setMinutes((prevMinutes) => prevMinutes + 1);
                }

                if (minutes === 60) {
                    setMinutes(0);
                    setHours((prevHours) => prevHours + 1);
                }
            }, 10);
        }

        return () => clearInterval(timer); 
    }, [isRunning, milliseconds, seconds, minutes]);

    const start = () => {
        setIsRunning(true);
    };

    const stop = () => {
        clearInterval(timer);
        setIsRunning(false);
    };

    const reset = () => {
        setMilliseconds(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsRunning(false);
    };

    return (
        <>
            <center>
                <div className="timer">
                    <h1 id="title">StopWatch</h1>
                    <h2>
                        {hours < 10 ? "0" + hours : hours} :{" "}
                        {minutes < 10 ? "0" + minutes : minutes} :{" "}
                        {seconds < 10 ? "0" + seconds : seconds} :{" "}
                        {milliseconds < 100 ? milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds : milliseconds}
                    </h2>

                    <button className="start" onClick={start}>
                        Start
                    </button>
                    <button className="stop" onClick={stop}>
                        Stop
                    </button>
                    <button className="reset" onClick={reset}>
                        Reset
                    </button>
                </div>

            </center>
        </>
    );
}
