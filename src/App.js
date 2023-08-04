import logo from './logo.svg';
import './App.css';
import Clock from "./Clock";
import NavBar from "./NavBar";
import Alarm from "./Alarm";
import Timer from "./Timer";
import StopWatch from "./StopWatch";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
            <Route path = "/" element={<Clock/>}/>
            <Route path = "/alarm" element={<Alarm/>}/>
            <Route path = "/timer" element={<Timer/>}/>
            <Route path = "/stopwatch" element={<StopWatch/>}/>
            <Route path = "*" element={<Clock/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
