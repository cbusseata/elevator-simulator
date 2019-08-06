import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';
import { connect } from 'react-redux';
import { setButtonActive } from '../actions/buttonPanel-actions';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.5/node_modules/redux';

function ElevatorButtonPanel(props) {
    const panelButtonPressed = (i) => {
        props.onPanelButtonPressed(i);
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
        buttonsActive: state['buttonPanel']['buttonsActive'],
        numFloors: props.numFloors,
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onPanelButtonPressed: setButtonActive
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ElevatorButtonPanel);
