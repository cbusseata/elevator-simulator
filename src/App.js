import React from 'react';
import './App.css';
import Building from './components/Building';
import CarButtonPanel from './components/CarButtonPanel';

function App() {
    return (
        <div>
            <div>
                <h1>Elevator Simulator</h1>
            </div>
            <Building numFloors={5} />
            <CarButtonPanel numFloors={5} />
        </div>
    );
}

export default App;
