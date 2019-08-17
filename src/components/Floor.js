import React from 'react';
import styled from 'styled-components';
import Room from './Room';

/**
 * Renders a single floor.
 * 
 * @param {Object} props
 */
function Floor(props) {
    /**
     * Construct the array of JSX Room elements, given a floor number and an indication of 
     *  whether this is the top floor.
     * 
     * @param {number}  floorNumber 
     * @param {boolean} isTopFloor 
     * 
     * @return {Array} JSX Room elements
     */
    const renderRooms = (floorNumber, isTopFloor) => {
        const rooms = [];
        for (let side of ['left', 'middle', 'right']) {
            rooms.push(
                <Room
                    key={side} // Necessary because this is an array
                    floorNumber={floorNumber}
                    side={side} 
                    onTopFloor={isTopFloor || false}
                />
            );
        }

        return rooms;
    }

    return (
        <FloorElement>
            {renderRooms(props.floorNumber, props.isTopFloor)}
        </FloorElement>
    );
}

const FloorElement = styled.div`
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: 100px;
    grid-gap: 10px;
`;

export default Floor;
