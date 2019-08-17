import React from 'react';
import styled from 'styled-components';

/**
 * Renders a single elevator button.
 * 
 * @param {Object} props
 */
function ElevatorButton(props) {
    return (
        <ElevatorButtonElement 
            onClick={props.onClick} 
            lit={props.lit || false}
        >
            {props.display}
        </ElevatorButtonElement>
    );
}

const ElevatorButtonElement = styled.button`
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    text-align: center;
    position: relative;
    background-color: ${props => props.lit ? 'yellow' : '#FFF'};
    border: 1px solid #AAA;

    :active {
        background-color: yellow;
    }
`;

export default ElevatorButton;
