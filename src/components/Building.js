import React from 'react';
import styled from 'styled-components';
import Floor from './Floor';
import Shaft from './Shaft';

function Building(props) {
    const floors = [];
    for (let i = 1; i <= props.numFloors; i++) {
        let isTopFloor = false;
        let isBottomFloor = false;

        // If we do it this way, the key tag matches the floor number
        if (i === 1) {
            isBottomFloor = true;
        } else if (i === props.numFloors) {
            isTopFloor = true;
        }

        floors.push(
            <Floor 
                key={i}
                isTopFloor={isTopFloor}
                isBottomFloor={isBottomFloor}
            />
        );
    }

    // We need to reverse the floors array to get it to display properly,
    //  we are creating the building upside-down
    return (
        <BuildingElement>
            {floors.reverse()}
            <Shaft />
        </BuildingElement>
    );
}

const BuildingElement = styled.div`
    float: left;
    margin-top: 20px;
    margin-left: 50px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 100px);
    grid-auto-rows: minmax(100px, 100px);
    grid-gap: 10px;
    background-color: #555;
    border: 1px solid #000;
    color: white;
    max-width: 320px;
`;

export default Building;
