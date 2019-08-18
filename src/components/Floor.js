import React from 'react';
import styled from 'styled-components';
import Room from './Room';
import { ROOMS_PER_FLOOR, ROOM_WIDTH, ROOM_HEIGHT } from '../constants';

/**
 * Renders a single floor.
 * 
 * @param {Object} props
 */
function Floor(props) {
    /**
     * Construct the array of JSX Room elements, given a floor number, an indication of 
     *  whether this is the top floor, and the number of rooms to render on that floor.
     * 
     * @param {number}  floorNumber 
     * @param {boolean} isTopFloor 
     * @param {number}  roomsPerFloor
     * 
     * @return {Array} JSX Room elements
     */
    const renderRooms = (floorNumber, isTopFloor, roomsPerFloor) => {
        const rooms = [];
        for (let i = 1; i <= roomsPerFloor; i++) {
            rooms.push(
                <Room
                    key={i} // Necessary because this is an array
                    floorNumber={floorNumber}
                    side={i === 1 ? 'left' : (i === roomsPerFloor ? 'right' : 'middle')} 
                    onTopFloor={isTopFloor || false}
                />
            );
        }

        return rooms;
    }

    return (
        <FloorElement
            roomsPerFloor={props.roomsPerFloor}
        >
            {renderRooms(props.floorNumber, props.isTopFloor, props.roomsPerFloor)}
        </FloorElement>
    );
}

const FloorElement = styled.div(props => ({
    gridColumn: `1 / span ${props.roomsPerFloor}`,
    display: 'grid',
    gridTemplateColumns: `repeat(${ROOMS_PER_FLOOR}, ${ROOM_WIDTH}px)`,
    gridTemplateRows: `${ROOM_HEIGHT}px`,
    gridGap: `10px`,
}));

export default Floor;
