import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';

function RoomButtonPanel(props) {
    return (
        <RoomButtonPanelElement side={props.side}>
            <RoomButtonPanelUpContainerElement showUp={props.showUp}>
                <ElevatorButton display="^" />
            </RoomButtonPanelUpContainerElement>

            <RoomButtonPanelDownContainerElement showDown={props.showDown}>
                <ElevatorButton display="v" />
            </RoomButtonPanelDownContainerElement>
        </RoomButtonPanelElement>
    );
}

const RoomButtonPanelElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '70px',
    [props.side === 'left' ? 'right' : 'left']: '10px',
    top: '15px',
}));

const RoomButtonPanelUpContainerElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '30px',
    left: '0px',
    top: '0px',
    visibility: props.showUp ? 'visible' : 'hidden',
}));

const RoomButtonPanelDownContainerElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '30px',
    left: '0px',
    top: '40px',
    visibility: props.showDown ? 'visible' : 'hidden',
}));

export default RoomButtonPanel;
