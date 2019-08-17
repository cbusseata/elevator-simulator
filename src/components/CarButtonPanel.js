import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';
import { connect } from 'react-redux';
import { setCarPanelButtonActive, addStop } from '../actions/elevator-actions';
import { bindActionCreators } from 'redux';

function CarButtonPanel(props) {
    const panelButtonPressed = (floorNumber) => {
        if (floorNumber === props.carCurrentFloor) {
            return;
        }

        props.setCarPanelButtonActive(floorNumber);
        props.carAddStop(floorNumber);
    }

    const renderElevatorButtonTd = (i) => {
        let lit = false;
        if (props.buttonsActive.includes(i)) {
            lit = true;
        }

        return (
            <PanelTdElement key={i}>
                <ElevatorButton 
                    display={i} 
                    onClick={() => panelButtonPressed(i)} 
                    lit={lit}
                />
            </PanelTdElement>
        );
    }

    const rows = [];
    const tds = [];
    let i = 1;
    while (i <= props.numFloors) {
        tds.push(renderElevatorButtonTd(i));

        if (tds.length === 2) {
            rows.push(
                <tr key={i}>
                    {tds.slice(0)}
                </tr>
            );

            // Flush the tds array
            tds.splice(0);
        }

        i++;
    }

    if (tds.length > 0) {
        rows.push(
            <tr key={i}>
                {tds.slice(0)}
            </tr>
        );
    }

    return (
        <PanelElement>
            <table>
                <tbody>
                    {rows.reverse()}
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
