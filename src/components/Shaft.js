import React from 'react';
import styled from 'styled-components';
import Car from './Car';
import { ELEVATOR_SHAFT_COLUMN, ROOMS_PER_FLOOR } from '../constants';

/**
 * Renders the elevator shaft, which contains the car.
 * 
 * @param {Object} props
 */
function Shaft(props) {
    return (
        <ShaftElement numFloors={props.numFloors}>
            <Car />
        </ShaftElement>
    );
}

const ShaftElement = styled.div(props => ({
    backgroundColor: '#333',
    position: 'absolute',
    gridColumn: `${ELEVATOR_SHAFT_COLUMN} / ${ROOMS_PER_FLOOR}`,
    gridRow: `1 / span {props.numFloors}`,
    width: '100%',
    height: '100%',
}));

export default Shaft;
