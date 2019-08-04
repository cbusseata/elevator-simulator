import React from 'react';
import styled from 'styled-components';
import Room from './Room';

function Floor(props) {
    return (
        <FloorElement>
            <Room 
                side="left" 
                onTopFloor={props.isTopFloor || false}
                onBottomFloor={props.isBottomFloor || false}
            />
            <Room 
                side="middle" 
                onTopFloor={props.isTopFloor || false}
                onBottomFloor={props.isBottomFloor || false}
            />
            <Room 
                side="right" 
                onTopFloor={props.isTopFloor || false}
                onBottomFloor={props.isBottomFloor || false}
            />
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
