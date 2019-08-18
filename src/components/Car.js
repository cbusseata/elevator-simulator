import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { floorReached, finishDisembarking, closeDoors } from '../actions/elevator-actions';
import { ROOM_WIDTH, ROOM_HEIGHT, CAR_SPEED, DOOR_SPEED } from '../constants';

/**
 * Renders the elevator car.
 * 
 * @param {Object} props 
 */
function Car(props) {
    /**
     * Total number of pixels wide each door should be when closed.
     * 
     * @type {number}
     */
    const fullDoorWidth = (ROOM_WIDTH - 40) / 2;

    /**
     * The CSS absolute bottom position property of the elevator car within the shaft element,
     *  and its setter function.
     */
    const [carBottomY, setCarBottomY] = useState(getCarBottomYAtFloor(props.currentFloor));

    /**
     * The CSS width property of the elevator doors and its setter function.
     */
    const [doorWidth, setDoorWidth] = useState(fullDoorWidth);

    /**
     * Move the car up or down, depending on where the next floor is.
     */
    const handleCarMoving = () => {
        if (carBottomY !== getCarBottomYAtFloor(props.nextFloor)) {
            let yChange = props.nextFloor > props.currentFloor ? CAR_SPEED : -CAR_SPEED;

            window.requestAnimationFrame(() => setCarBottomY(carBottomY + yChange));
        } else {
            // Floor reached
            props.floorReached(props.nextFloor);
        }
    }

    /**
     * Handle the animation of the car doors opening/closing.
     */
    const handleCarDisembarking = () => {
        if (props.doorStatus !== 'opening' && props.doorStatus !== 'closing') {
            // Do nothing
            return;
        }

        if (props.doorStatus === 'opening' && doorWidth === 0) {
            setTimeout(function () {
                props.closeDoors();
            }, 1000);
        } else if (props.doorStatus === 'closing' && doorWidth === fullDoorWidth) {
            props.finishDisembarking();
        } else {
            let widthChange = props.doorStatus === 'opening' ? -DOOR_SPEED : DOOR_SPEED;
    
            window.requestAnimationFrame(() => setDoorWidth(doorWidth + widthChange));
        }
    }

    switch (props.status) {
        case 'moving':
            handleCarMoving();
            break;
        case 'disembarking':
            handleCarDisembarking();
            break;
        default:
            break;
    }

    return (
        <CarElement 
            currentFloor={props.currentFloor} 
            style={{bottom: carBottomY+'px'}}
        >
            <InnerCarElement />
            <DoorElement 
                side="left" 
                style={{width: doorWidth+'px'}}
            />
            <DoorElement 
                side="right" 
                style={{width: doorWidth+'px'}}
            />
        </CarElement>
    );
}

/**
 * Gets the Y value for the absolute 'bottom' CSS property of the car.
 * 
 * @param {number} floorNumber 
 * 
 * @return {number}
 */
function getCarBottomYAtFloor(floorNumber) {
    return ((floorNumber - 1) * 110) + 10;
}

const CarElement = styled.div(props => ({
    position: 'absolute',
    left: '10px',
    width: `${ROOM_WIDTH - 20}px`,
    height: `${ROOM_HEIGHT - 20}px`,
    backgroundColor: '#666',
    border: '1px solid #666',
}));

const InnerCarElement = styled.div`
    position: absolute;
    height: ${ROOM_HEIGHT - 40}px;
    width: ${ROOM_WIDTH - 38}px;
    bottom: 1px;
    background-color: #FFF;
    left: 8px;
`;

const DoorElement = styled.div(props => ({
    position: 'absolute',
    height: `${ROOM_HEIGHT - 40}px`,
    bottom: '1px',
    backgroundColor: '#000',
    [props.side === 'left' ? 'right' : 'left']: '8px',
}));

const mapStateToProps = (state, props) => {
    return {
        status: state['status'],
        doorStatus: state['doorStatus'],
        currentFloor: state['currentFloor'],
        nextFloor: state['stops'] ? state['stops'][0] : null,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        floorReached: floorReached,
        finishDisembarking: finishDisembarking,
        closeDoors: closeDoors,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Car);
