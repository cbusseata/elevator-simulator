import React from 'react';
import './App.css';
import Building from './components/Building';
import CarButtonPanel from './components/CarButtonPanel';

import { NUM_FLOORS, ROOMS_PER_FLOOR } from './constants';

/**
 * Render the full app.
 */
function App() {
    return (
        <div>
            <div>
                <h1>Elevator Simulator</h1>
            </div>
            <Building 
                numFloors={NUM_FLOORS} 
                roomsPerFloor={ROOMS_PER_FLOOR}
            />
            <CarButtonPanel numFloors={NUM_FLOORS} />
        </div>
    );
}

export default App;
