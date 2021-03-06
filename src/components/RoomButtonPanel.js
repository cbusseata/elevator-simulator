import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';
import { connect } from 'react-redux';
import { setFloorButtonsActive, addStop } from '../actions/elevator-actions';
import { bindActionCreators } from 'redux';
import { ROOM_HEIGHT } from '../constants';

/**
 * The button on an individual room.
 * 
* @param {Object} props
 */
function RoomButtonPanel(props) {
    /**
     * Invokes the necessary event methods passed as props when a button on a room's button panel
     *  is pressed.
     * 
     * @param {number} floor 
     * @param {string} direction 'up' or 'down'
     */
    const panelButtonPressed = (floor, direction) => {
        props.setFloorButtonsActive(floor, direction);
        props.carAddStop(floor, direction);
    }

    return (
        <RoomButtonPanelElement side={props.side}>
            <RoomButtonPanelUpContainerElement showUp={props.showUp}>
                <ElevatorButton 
                    display="^" 
                    onClick={() => panelButtonPressed(props.floorNumber, 'up')} 
                    lit={props.buttonsActive && props.buttonsActive['upButtonsActive'] ? true : false}
                />
            </RoomButtonPanelUpContainerElement>

            <RoomButtonPanelDownContainerElement showDown={props.showDown}>
                <ElevatorButton 
                    display="v" 
                    onClick={() => panelButtonPressed(props.floorNumber, 'down')} 
                    lit={props.buttonsActive && props.buttonsActive['downButtonsActive'] ? true : false}
                />
            </RoomButtonPanelDownContainerElement>
        </RoomButtonPanelElement>
    );
}

const RoomButtonPanelElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '70px',
    [props.side === 'left' ? 'right' : 'left']: '10px',
    top: `${(ROOM_HEIGHT - 70)/2}px`,
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

const mapStateToProps = (state, props) => {
    return {
        buttonsActive: state['floorButtonPanels'][props.floorNumber],
        numFloors: props.numFloors,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        setFloorButtonsActive: setFloorButtonsActive,
        carAddStop: addStop,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RoomButtonPanel);
