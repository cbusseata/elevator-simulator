import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { moveToFloor, floorReached } from '../actions/car-actions';
import { bindActionCreators } from 'redux';

function Car(props) {
    console.log('Car', props);

    if (props.isMoving) {
        console.log('Car', 'isMoving');
        if (props.currentFloor !== props.nextFloor) {
            let floorToMoveTo = props.nextFloor > props.currentFloor ?
                props.currentFloor + 1 :
                props.currentFloor - 1;

            // Move
            setTimeout(function () {
                props.moveToFloor(floorToMoveTo);
            }, 1000);
        } else {
            // Floor reached
            props.floorReached(props.nextFloor);
        }
    }

    return (
        <CarElement currentFloor={props.currentFloor}>
            <DoorElement side="left" />
            <DoorElement side="right" />
        </CarElement>
    );
}

const CarElement = styled.div(props => ({
    position: 'absolute',
    left: '10px',
    bottom: (((props.currentFloor-1)*110)+10)+'px',
    width: '80px',
    height: '80px',
    backgroundColor: '#666',
    border: '1px solid #666',
}));

const DoorElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '60px',
    bottom: '1px',
    backgroundColor: '#000',
    [props.side === 'left' ? 'right' : 'left']: '8px',
}));

const mapStateToProps = (state, props) => {
    return {
        isMoving: state['car']['isMoving'],
        direction: state['car']['direction'],
        currentFloor: state['car']['currentFloor'],
        nextFloor: state['car']['stops'] ? state['car']['stops'][0] : null,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        moveToFloor: moveToFloor,
        floorReached: floorReached,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Car);
