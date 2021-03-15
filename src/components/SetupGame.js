import React, { Component, useState } from 'react';

import {
    Grid,
    Button,
} from '@material-ui/core';


export default function SetupGame() {
    
    const [shipByMe, setShipByMeFlow] = useState(false);
    
    let cellList = [];

    const setShipByMe = () => {
        setShipByMeFlow(!shipByMe);
    }

    let flow = (
        <Grid container item xs={5} direction="column">
            <Button variant="contained" color="primary" className="button" onClick={setShipByMe}>
                Set ship by me
            </Button>
            <Button variant="contained" color="primary" className="button">
                Random
            </Button>
        </Grid>
    );

    if(shipByMe) {
        flow = (
            <Grid container item xs={5} direction="column">
                <Button variant="contained" color="primary" className="button">
                    Horizontal ship
                </Button>
                <Button variant="contained" color="primary" className="button">
                    Vertical ship
                </Button>
                <Button variant="contained" color="primary" className="button button-random">
                    Random
                </Button>
            </Grid>
        );
    }

    for(let num = 1; num <= 100; num++) {
        cellList.push(
            (<div key={num} className="ship-cell"></div>)
        );
    }

    

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} className='header-title' justify="center" alignItems="center">
                <h2 className="title">SETUP GAME</h2>
            </Grid>
            <Grid container item xs={12} spacing={6}>
                <Grid container item xs={6} direction="column" alignItems="flex-end">
                    {flow}
                </Grid>
                <Grid container item xs={6}>
                    <div className="player-board">
                        {
                            cellList.map((elem) => {
                                return elem;
                            })
                        }
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
