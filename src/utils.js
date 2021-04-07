import React from 'react';
import {
    Grid,
} from '@material-ui/core';

export const getCellList = (handleMouseOver, handleMouseLeave, handleMouseClick) => {
    let cellList = [];

    for(let num = 1; num <= 100; num++) {
        cellList.push(
            (<div
                key={num}
                className="ship-cell"
                shipcellid={num}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseClick}
            >
            </div>)
        );
    }

    return cellList;
}

export const shipStyles = () => {
    let ship_4 = [];
    let ship_3 = [];
    let ship_2 = [];
    let ship_1 = [];

    for(let num = 1; num <= 4; num++) {
        ship_4.push(
            (<div
                key={num}
                className="ship-4"
            >
            </div>)
        );
    }
    for(let num = 1; num <= 3; num++) {
        ship_3.push(
            (<div
                key={num}
                className="ship-3"
            >
            </div>)
        );
    }
    for(let num = 1; num <= 2; num++) {
        ship_2.push(
            (<div
                key={num}
                className="ship-2"
            >
            </div>)
        );
    }
    for(let num = 1; num <= 1; num++) {
        ship_1.push(
            (<div
                key={num}
                className="ship-1"
            >
            </div>)
        );
    }

    return (
        <Grid container item xs={12} className="ship-stylies">
           <Grid container item xs={3} justify="center" alignItems="center">
                {
                    ship_4.map((elem) => {
                        return elem;
                    })
                }
                 <span className="ship-styiles__title">4 x 1</span>
            </Grid>
            <Grid container item xs={3} justify="center" alignItems="center">
                {
                    ship_3.map((elem) => {
                        return elem;
                    })
                }
                 <span className="ship-styiles__title">3 x 2</span>
            </Grid>
            <Grid container item xs={3} justify="center" alignItems="center">
                {
                    ship_2.map((elem) => {
                        return elem;
                    })
                }
                 <span className="ship-styiles__title">2 x 3</span>
            </Grid>
            <Grid container item xs={3} justify="center" alignItems="center">
                {
                    ship_1.map((elem) => {
                        return elem;
                    })
                }
                 <span className="ship-styiles__title">1 x 4</span>
            </Grid>
        </Grid>
    );
}
