import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import {
    Container,
    Grid,
    Button,
} from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow';


const setupSection = () => {
    return (
        <Grid container item xs={12} justify="center" alignItems="center" className="button_section">
            <Button
                variant="contained"
                color="default"
                size="large"
                startIcon={<PlayArrow />}
            >
                Battleship
            </Button>
        </Grid>
    )
};

export default function GameBoard() {

    return (
        <Grid container item xs={12}>
            {setupSection()}
        </Grid>
    );
}
 