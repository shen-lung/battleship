import React, { Component, useState } from 'react';

import {
    Grid,
} from '@material-ui/core';
import { render } from 'react-dom';


export default function SetupGame() {
    let shipsConfigurationList = {
        ship_4: {
            drag: [
                {name:'ship_4_1', className: 'ship-four'}
            ],
            drop: [],
        },
        ship_3: {
            drag: [
                {name:'ship_3_1', className: 'ship-three'},
                {name:'ship_3_2', className: 'ship-three'}
            ],
            drop: []
        },
        ship_2: {
            drag: [
                {name:'ship_2_1', className: 'ship-two'},
                {name:'ship_2_2', className: 'ship-two'},
                {name:'ship_2_3', className: 'ship-two'},
            ],
            drop: [],
        },
        ship_1: {
            drag: [
                {name:'ship_1_1', className: 'ship-one'},
                {name:'ship_1_2', className: 'ship-one'},
                {name:'ship_1_3', className: 'ship-one'},
                {name:'ship_1_4', className: 'ship-one'},
            ],
            drop: [],
        },
    };

    const [shipList, setShipList] = useState(shipsConfigurationList);

    const onDragStart = (elem, shipId, collectionShipId) => {
        elem.dataTransfer.setData('shipId', shipId);
        elem.dataTransfer.setData('collectionShipId', collectionShipId);
    }

    const onDragOver = (elem) => {
        elem.preventDefault();
    }

    const onDrop = (elem, cat) => {
        
        let shipId = elem.dataTransfer.getData('shipId');
        let collectionShipId = elem.dataTransfer.getData('collectionShipId');
        let isShipPresent = false;
        let shipIndex = null;
        let actionCat = 'drop';
        
        shipList[collectionShipId][cat].forEach((ship) => {
            if(ship.name === shipId) {
                isShipPresent = true;
            }
        });

        if(!isShipPresent) {
            if(actionCat === cat) {
                actionCat = 'drag';
            }
            
            shipList[collectionShipId][actionCat].forEach((ship, index) => {
                if (ship.name == shipId) {
                    shipIndex = index;
                }
            });
            
            shipList[collectionShipId][cat].push(
                shipList[collectionShipId][actionCat][shipIndex]
            );
            shipList[collectionShipId][actionCat].splice(shipIndex, 1);
            
            setShipList({
                ...shipList,
                collectionShipId: shipList[collectionShipId][cat],
            });
        }
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} className='header-title' justify="center" alignItems="center">
                <h2>SETUP GAME</h2>
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={6} justify="center">
                    <div className="ship-section">
                        <Grid
                            container item xs={12}
                            onDragOver={(elem)=>onDragOver(elem)}
                            onDrop={(elem)=>{onDrop(elem, "drag")}}
                            className="ship-section"
                        >
                            <Grid container item xs={12} className="ship-section--space">
                                {
                                    shipList['ship_4'].drag.map((ship) => (
                                        <div key={ship.name} className="ship-section--space-section">
                                            <div
                                                onDragStart = {(elem) => onDragStart(elem, ship.name, 'ship_4')}
                                                draggable
                                                className={ship.className}
                                            >
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>
                            <Grid container item xs={12} className="ship-section--space">
                                {
                                    shipList['ship_3'].drag.map((ship) => (
                                        <div key={ship.name} className="ship-section--space-section">
                                            <div
                                                onDragStart = {(elem) => onDragStart(elem, ship.name, 'ship_3')}
                                                draggable
                                                className={ship.className}
                                            >
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>
                            <Grid container item xs={12} className="ship-section--space">
                                {
                                    shipList['ship_2'].drag.map((ship) => (
                                        <div key={ship.name} className="ship-section--space-section">
                                            <div
                                                onDragStart = {(elem) => onDragStart(elem, ship.name, 'ship_2')}
                                                draggable
                                                className={ship.className}
                                            >
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>
                            <Grid container item xs={12} className="ship-section--space">
                                {
                                    shipList['ship_1'].drag.map((ship) => (
                                        <div key={ship.name} className="ship-section--space-section">
                                            <div
                                                onDragStart = {(elem) => onDragStart(elem, ship.name, 'ship_1')}
                                                draggable
                                                className={ship.className}
                                            >
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid container item xs={6} justify="center">
                    <div className="ship-board">
                        <Grid
                            container item xs={12}
                            onDragOver={(elem)=>onDragOver(elem)}
                            onDrop={(elem)=>{onDrop(elem, "drop")}}
                            className="ship-board"
                        >
                            <Grid container item xs={12} className="ship-section--space">
                                {
                                    shipList['ship_1'].drop.map((ship) => (
                                        <div key={ship.name} className="ship-section--space-section">
                                            <div
                                                onDragStart = {(elem) => onDragStart(elem, ship.name, 'ship_1')}
                                                draggable
                                                className={ship.className}
                                            >
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>        
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
