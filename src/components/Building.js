import React from 'react';
import styled from 'styled-components';
import Floor from './Floor';
import Shaft from './Shaft';
import { ROOMS_PER_FLOOR, ROOM_WIDTH, ROOM_HEIGHT } from '../constants';

/**
 * The entire building.
 * 
 * @param {Object} props
 */
function Building(props) {
    /**
     * Construct the array of JSX Floor elements, given a number of floors to render
     * 
     * @param {number} numFloors 
     * @param {number} roomsPerFloor
     * 
     * @return {Array} JSX Floor elements
     */
    const renderFloors = (numFloors, roomsPerFloor) => {
        const floors = [];

        // We start at numFloors and count down to 1 so that the key tag matches the 
        //  floor number
        for (let i = numFloors; i >= 1; i--) {
            floors.push(
                <Floor 
                    key={i}
                    floorNumber={i}
                    roomsPerFloor={roomsPerFloor}
                    isTopFloor={i === numFloors}
                />
            );
        }

        return floors;
    }

    return (
        <BuildingElement>
            {renderFloors(props.numFloors, props.roomsPerFloor)}
            <Shaft numFloors={props.numFloors} />
        </BuildingElement>
    );
}

const gridGap = 10;
// Calculate the max width, factoring in the grid gap
const maxWidth = ROOMS_PER_FLOOR * ROOM_WIDTH + ((ROOMS_PER_FLOOR - 1) * gridGap);

const BuildingElement = styled.div`
    float: left;
    margin-top: 20px;
    margin-left: 50px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(${ROOMS_PER_FLOOR}, ${ROOM_HEIGHT}px);
    grid-auto-rows: minmax(${ROOM_WIDTH}px, ${ROOM_WIDTH}px);
    grid-gap: ${gridGap}px;
    background-color: #555;
    border: 1px solid #000;
    color: white;
    max-width: ${maxWidth}px;
`;

export default Building;
