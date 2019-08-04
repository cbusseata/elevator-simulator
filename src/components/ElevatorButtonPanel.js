import React from 'react';
import styled from 'styled-components';
import ElevatorButton from './ElevatorButton';

function ElevatorButtonPanel(props) {
    const rows = [];
    const tds = [];
    let i = 1;
    while (i <= props.numFloors) {
        tds.push(
            <PanelTdElement key={i}>
                <ElevatorButton display={i} />
            </PanelTdElement>
        );

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

export default ElevatorButtonPanel;
