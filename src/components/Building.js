import React from 'react';
import styled from 'styled-components';
import Floor from './Floor';
import Shaft from './Shaft';

/**
 * The entire building.
 * 
 * @param {Object} props
 */
function Building(props) {
    /**
     * Construct the array of JSX Floor elements, given a number of floors to render
     * 
     * @param {number} numFloors 
     * 
     * @return {Array} JSX Floor elements
     */
    const renderFloors = (numFloors) => {
        const floors = [];

        // We start at numFloors and count down to 1 so that the key tag matches the 
        //  floor number
        for (let i = numFloors; i >= 1; i--) {
            floors.push(
                <Floor 
                    key={i}
                    floorNumber={i}
                    isTopFloor={i === numFloors}
                />
            );
        }

        return floors;
    }

    return (
        <BuildingElement>
            {renderFloors(props.numFloors)}
            <Shaft />
        </BuildingElement>
    );
}

const BuildingElement = styled.div`
    float: left;
    margin-top: 20px;
    margin-left: 50px;
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 100px);
    grid-auto-rows: minmax(100px, 100px);
    grid-gap: 10px;
    background-color: #555;
    border: 1px solid #000;
    color: white;
    max-width: 320px;
`;

export default Building;
