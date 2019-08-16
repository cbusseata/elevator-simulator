import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { floorReached } from '../actions/elevator-actions';
import { bindActionCreators } from 'redux';

function Car(props) {
    const [carBottomY, setCarBottomY] = useState(getCarBottomYAtFloor(props.currentFloor));

    if (props.status) {
        if (carBottomY !== getCarBottomYAtFloor(props.nextFloor)) {
            let yChange = props.nextFloor > props.currentFloor ? 2 : -2;

            window.requestAnimationFrame(() => setCarBottomY(carBottomY + yChange));
        } else {
            // Floor reached
            props.floorReached(props.nextFloor);
        }
    }

    return (
        <CarElement 
            currentFloor={props.currentFloor} 
            style={{bottom: carBottomY+'px'}}
        >
            <DoorElement side="left" />
            <DoorElement side="right" />
        </CarElement>
    );
}

function getCarBottomYAtFloor(floorNumber) {
    return ((floorNumber - 1) * 110) + 10;
}

const CarElement = styled.div(props => ({
    position: 'absolute',
    left: '10px',
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
        status: state['status'],
        currentFloor: state['currentFloor'],
        nextFloor: state['stops'] ? state['stops'][0] : null,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        floorReached: floorReached,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Car);
