import React from 'react';
import './App.css';
import Building from './components/Building';
import ElevatorButtonPanel from './components/ElevatorButtonPanel';

function App() {
    return (
        <div>
            <div>
                <h1>Elevator Simulator</h1>
            </div>
            <Building numFloors={5} />
            <ElevatorButtonPanel numFloors={5} />
        </div>
    );
}

export default App;
