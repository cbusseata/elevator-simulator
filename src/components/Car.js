import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { floorReached, finishedDisembarking } from '../actions/elevator-actions';
import { bindActionCreators } from 'redux';

/**
 * Renders the elevator car.
 * 
 * @param {Object} props 
 */
function Car(props) {
    const [carBottomY, setCarBottomY] = useState(getCarBottomYAtFloor(props.currentFloor));
    const [doorStatus, setDoorStatus] = useState('closed');
    const [doorWidth, setDoorWidth] = useState(30);

    switch (props.status) {
        case 'moving':
            if (doorStatus !== 'closed') {
                setDoorStatus('closed');
            }
            
            if (carBottomY !== getCarBottomYAtFloor(props.nextFloor)) {
                let yChange = props.nextFloor > props.currentFloor ? 2 : -2;
    
                window.requestAnimationFrame(() => setCarBottomY(carBottomY + yChange));
            } else {
                // Floor reached
                props.floorReached(props.nextFloor);
            }
            break;

        case 'disembarking':
            if (doorStatus === 'closed') {
                setDoorStatus('opening');
            }

            if (doorStatus === 'opening' || doorStatus === 'closing') {
                if (doorStatus === 'opening' && doorWidth === 0) {
                    setTimeout(function () {
                        setDoorStatus('closing');
                    }, 1000);
                } else if (doorStatus === 'closing' && doorWidth === 30) {
                    setDoorStatus('shut'); // Prevent an extra opening pixel
                    props.finishedDisembarking();
                } else {
                    let widthChange = doorStatus === 'opening' ? -1 : 1;
            
                    window.requestAnimationFrame(() => setDoorWidth(doorWidth + widthChange));
                }
            }
            break;

        case 'idle':
        default:
            if (doorStatus !== 'closed') {
                setDoorStatus('closed');
            }
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
    width: '80px',
    height: '80px',
    backgroundColor: '#666',
    border: '1px solid #666',
}));

const InnerCarElement = styled.div`
    position: absolute;
    height: 60px;
    width: 62px;
    bottom: 1px;
    background-color: #FFF;
    left: 8px;
`;

const DoorElement = styled.div(props => ({
    position: 'absolute',
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
        finishedDisembarking: finishedDisembarking,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Car);
