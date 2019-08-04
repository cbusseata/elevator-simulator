import React from 'react';
import styled from 'styled-components';

function Car() {
    return (
        <CarElement>
            <DoorElement side="left" />
            <DoorElement side="right" />
        </CarElement>
    );
}

const CarElement = styled.div`
    position: absolute;
    left: 10px;
    top: 450px;
    width: 80px;
    height: 80px;
    background-color: #666;
    border: 1px solid #666;
`;

const DoorElement = styled.div(props => ({
    position: 'absolute',
    width: '30px',
    height: '60px',
    bottom: '1px',
    backgroundColor: '#000',
    [props.side === 'left' ? 'right' : 'left']: '8px',
}));

export default Car;