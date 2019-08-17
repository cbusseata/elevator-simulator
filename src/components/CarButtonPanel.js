import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';
import { connect } from 'react-redux';
import { setCarPanelButtonActive, addStop } from '../actions/elevator-actions';
import { bindActionCreators } from 'redux';

/**
 * Renders the button panel for an elevator car.
 * 
 * @param {Object} props 
 */
function CarButtonPanel(props) {
    /**
     * Invokes the necessary event methods passed as props when a button on the car's button panel
     *  is pressed.
     * 
     * @param {number} floorNumber 
     */
    const panelButtonPressed = (floorNumber) => {
        props.setCarPanelButtonActive(floorNumber);
        props.carAddStop(floorNumber);
    }

    /**
     * Renders a single JSX <td> element containing a button.
     * 
     * @param {number} floorNumber
     * 
     * @return {JSX} PanelTdElement
     */
    const renderElevatorButtonTd = (floorNumber) => {
        let lit = false;
        if (props.buttonsActive.includes(floorNumber)) {
            lit = true;
        }

        return (
            <PanelTdElement key={floorNumber}>
                <ElevatorButton 
                    display={floorNumber} 
                    onClick={() => panelButtonPressed(floorNumber)} 
                    lit={lit}
                />
            </PanelTdElement>
        );
    }

    /**
     * Renders the table JSX <tr> elements representing the rows of buttons on the panel.
     * 
     * @param {number} numFloors
     * 
     * @return {Array} JSX table row elements
     */
    const renderButtonPanelTableRows = (numFloors) => {
        const rows = [];
        const tds = [];

        let i = 1;
        while (i <= numFloors) {
            tds.push(renderElevatorButtonTd(i));
    
            if (tds.length === 2) {
                rows.push(<tr key={i}>{tds.slice(0)}</tr>);
    
                // Flush the tds array
                tds.splice(0);
            }
    
            i++;
        }
    
        if (tds.length > 0) {
            // Add any remaining TD elements in a last row
            rows.push(<tr key={i}>{tds.slice(0)}</tr>);
        }

        return rows.reverse();
    }

    return (
        <PanelElement>
            <table>
                <tbody>
                    {renderButtonPanelTableRows(props.numFloors)}
                </tbody>
            </table>
        </PanelElement>
    );
}

const PanelElement = styled.div`
    float: left;
    margin-top: 20px;
    margin-left: 50px;
    background-color: #cd7f32;
    padding: 30px;
`;

const PanelTdElement = styled.td`
    padding: 5px;
`;

const mapStateToProps = (state, props) => {
    return {
        buttonsActive: state['buttonPanelButtonsActive'],
        numFloors: props.numFloors,
        carCurrentFloor: state['currentFloor'],
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        setCarPanelButtonActive: setCarPanelButtonActive,
        carAddStop: addStop,
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(CarButtonPanel);
