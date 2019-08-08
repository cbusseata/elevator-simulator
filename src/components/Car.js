import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function Car(props) {
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
        currentFloor: state['car']['currentFloor'],
    };
};

export default connect(mapStateToProps)(Car);
