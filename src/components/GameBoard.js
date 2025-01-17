import React, { useState, useEffect } from 'react';
import SetupGame from './SetupGame';
import _ from 'lodash';

import {
    Container,
    Grid,
    Button,
} from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow';


const setupSection = (handleGameSection) => {
    return (

        <Grid container item xs={12} justify="center" alignItems="center">
            <h1 className="title-home">BattleShip</h1>
            <Grid container item xs={12} justify="center" alignItems="center" className="button_section">
                <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={handleGameSection}
                    startIcon={<PlayArrow />}
                >
                    Play
                </Button>
            </Grid>
        </Grid>
    )
};

const gameSetupSection = () => {
    return (
        <Container>
            <SetupGame />
        </Container>
    )
};


export default function GameBoard() {

    const [isGameSetupSection, setGameSetupSection] = useState(false);

    const handleGameSetupSection = () => {
        setGameSetupSection(true);
    };
    
    let currentSection = setupSection(handleGameSetupSection);

    if(isGameSetupSection) {
        currentSection = gameSetupSection();
    }
    
    return (
        <Grid container item xs={12}>
            {currentSection}
        </Grid>
    );
}
 