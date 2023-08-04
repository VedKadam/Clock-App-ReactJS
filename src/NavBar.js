import { Link } from "react-router-dom";

export default function NavBar(){

    return(
        <>
        <center>
            <div className="nav">
                <Link to="/">Clock</Link>
                <Link to="/alarm">Alarm</Link>
                <Link to="/timer">Timer</Link>
                <Link to="/stopwatch">StopWatch</Link>
            </div>
        </center>
        </>
    );

}