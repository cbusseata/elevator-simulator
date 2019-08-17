import React from 'react';
import styled from 'styled-components';
import Car from './Car';

function Shaft() {
    return (
        <ShaftElement>
            <Car />
        </ShaftElement>
    );
}

const ShaftElement = styled.div`
    background-color: #333;
    position: absolute;
    grid-column: 2 / 3;
    grid-row: 1 / span 5;
    width: 100%;
    height: 100%;
`;

export default Shaft
;