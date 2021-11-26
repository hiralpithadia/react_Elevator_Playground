import "./App.css";
import Elevator from "./ElevatorComponents/Elevator";

function App() {
  return (
    <div className="App">
      <header className="App-header">React Elevator Playground</header>
      {/* Parent Component Elevator where 2 child component will be imported */}
      <Elevator /> 
    </div>
  );
}

export default App;
