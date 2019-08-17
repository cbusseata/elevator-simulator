import React from 'react';
import styled from 'styled-components';
import RoomButtonPanel from './RoomButtonPanel';

/**
 * Renders an individual room.
 * 
 * @param {Object} props
 */
function Room(props) {
    return (
        <RoomElement className={props.side}>
            <RoomButtonPanel 
                side={props.side} 
                floorNumber={props.floorNumber}
                showUp={!props.onTopFloor}
                showDown={props.floorNumber !== 1}
            />
        </RoomElement>
    );
}

const RoomElement = styled.div`
    grid-column: auto;
    background-color: #DDD;
    position: relative;
`;

export default Room;
