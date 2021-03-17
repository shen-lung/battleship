import React, { Component, useState } from 'react';

import {
    Grid,
    Button,
} from '@material-ui/core';


export default function SetupGame() {
    let shipDetails = [
        { "name": "ship_4_1", "length": 4 },
        { "name": "ship_3_1", "length": 3 },
        { "name": "ship_3_2", "length": 3 },
        { "name": "ship_2_1", "length": 2 },
        { "name": "ship_2_2", "length": 2 },
        { "name": "ship_2_3", "length": 2 },
        { "name": "ship_1_1", "length": 1 },
        { "name": "ship_1_2", "length": 1 },
        { "name": "ship_1_3", "length": 1 },
        { "name": "ship_1_4", "length": 1 },
    ];
    const letterBoardList = ['A','B','C','D','E','F','G','H','I','J',];
    const numberBoardList = ['1','2','3','4','5','6','7','8','9','10',];
    const [shipByMe, setShipByMeFlow] = useState(false);
    const [shipOrientation, setShipOrientation] = useState('h');
    const [setupBoard, setSetupBoard] = useState(false);
    const [elemCellList, setElemList] = useState([]);
    const [elemCellListId, setElemCellListId] = useState([]);
    const [shipListDown, setShipListDown] = useState({});
    let [currentShip, setCurrentShip] = useState(0);
    let cellList = [];
    // console.log(currentShip);
    // console.log(elemCellList);
    // console.log(shipListDown);
    // console.log(elemCellListId);

    const handleShipByMe = () => {
        setShipByMeFlow(!shipByMe);
        setSetupBoard(!setupBoard);
    }

    const handleShipOrientationHor = () => {
        setShipOrientation('h');
    }
    
    const handleShipOrientationVer = () => {
        setShipOrientation('v');
    }

    const handleRandomSetup = () => {
        setSetupBoard(!setupBoard);
        let positionIdsList = [];
        let shipOrientationId;
        const shipOrientation = ['hor', 'ver']


        for(let pos = 1; pos <= 100; pos++) positionIdsList.push(pos);

        for(let count = 0; count < 10; count++) {
            const shipLength = shipDetails[count].length;
            let randomNumber = positionIdsList[Math.floor((Math.random() * positionIdsList.length) + 1) - 1];
            let endPoint;
            let isCellBusy;
            let cellEndPoint = 0;
            let isAllowed;
            let shipCellAttr;
            let elem;
            shipOrientationId = shipOrientation[Math.floor((Math.random() * 2) + 1) - 1];

            if(shipOrientationId === 'hor') {
                endPoint = randomNumber + shipLength - 2;

                do {
                    cellEndPoint = randomNumber + shipLength - 1;
                    isCellBusy = false;
                    for(let posCellHorBusy = randomNumber; posCellHorBusy <= cellEndPoint; posCellHorBusy++) {
                        if(elemCellListId.indexOf(posCellHorBusy) !== -1) {
                            isCellBusy = true;
                            positionIdsList.splice(posCellHorBusy - 1, 1);
                        }
                    }
                    isAllowed = isCellBusy || (endPoint % 10 >= 0 && endPoint % 10 < shipLength - 1);
                    if(isAllowed) {
                        randomNumber = positionIdsList[Math.floor((Math.random() * positionIdsList.length) + 1) - 1];
                        endPoint = randomNumber + shipLength - 2;
                    }
                }
                while(isAllowed);
                
                for(let posCellHor = randomNumber; posCellHor <= cellEndPoint; posCellHor++) {
                    shipCellAttr = `[shipcellid='${posCellHor}']`;
                    elem = document.querySelector(shipCellAttr);
                    elem.classList.add('ship-color');
                    elemCellListId.push(posCellHor);
                }
                setElemCellListId(elemCellListId);
            } else {
                endPoint = (shipLength * 10) - 10;

                do {
                    cellEndPoint = randomNumber + ((shipLength - 1) * 10);
                    isCellBusy = false;
                    for(let posCellVerBusy = randomNumber; posCellVerBusy <= cellEndPoint; posCellVerBusy+=10) {
                        if(elemCellListId.indexOf(posCellVerBusy) !== -1) {
                            isCellBusy = true;
                            positionIdsList.splice(posCellVerBusy - 1, 1);
                        }
                    }
                    isAllowed = isCellBusy || !(randomNumber + endPoint <= 100);
                    if(isAllowed) {
                        randomNumber = positionIdsList[Math.floor((Math.random() * positionIdsList.length) + 1) - 1];
                        endPoint = (shipLength * 10) - 10;
                    }
                }
                while(isAllowed);

                for(let posCellVer = randomNumber; posCellVer <= cellEndPoint; posCellVer+=10) {
                    shipCellAttr = `[shipcellid='${posCellVer}']`;
                    elem = document.querySelector(shipCellAttr);
                    elem.classList.add('ship-color');
                    elemCellListId.push(posCellVer);
                }
                setElemCellListId(elemCellListId);
            }
        };
    };

    const handleMouseOver = (elem) => {
        if(!setupBoard) {
            return
        }

        let currentElem =elem.target;
        let shipCellId = Number(currentElem.getAttribute('shipcellid'));
        const ship = shipDetails[currentShip];
        const shipLength = ship.length;
        
        if(shipOrientation === 'h') {
            let endPoint = shipCellId + shipLength - 2;

            if (!(endPoint % 10 >= 0 && endPoint % 10 < shipLength - 1)) {
                let elemList = [currentElem];
                let cellEndPoint = shipCellId + shipLength - 1;
                
                currentElem.classList.add('ship-color');

                for(let pos = shipCellId + 1; pos <= cellEndPoint; pos++) {
                    let shipCellAttr = `[shipcellid='${pos}']`;
                    let elem = document.querySelector(shipCellAttr);
                    elem.classList.add('ship-color');
                    elemList.push(elem);
                }
                setElemList(elemList);
            } else {
                elemCellList.map((elem) => {
                    elem.classList.remove('ship-color');
                })
            }
        } else {
            let endPoint = (shipLength * 10) - 10;

            if (shipCellId + endPoint <= 100) {
                let elemList = [currentElem];
                let cellEndPoint = shipCellId + ((shipLength - 1) * 10);
                
                currentElem.classList.add('ship-color');

                for(let pos = shipCellId + 10; pos <= cellEndPoint; pos+=10) {
                    let shipCellAttr = `[shipcellid='${pos}']`;
                    let elem = document.querySelector(shipCellAttr);
                    elem.classList.add('ship-color');
                    elemList.push(elem);
                }
                setElemList(elemList);
            } else {
                elemCellList.map((elem) => {
                    elem.classList.remove('ship-color');
                })
            }
        }
    }

    const handleMouseLeave = () => {
        elemCellList.map((elem) => {
            const shipCellId = Number(elem.getAttribute('shipcellid'));

            if(elemCellListId.indexOf(shipCellId) === -1) {
                elem.classList.remove('ship-color');
            }
        })
    }

    const handleMouseClick = () => {
        const isIdBusy = elemCellList.map((elem) => {
            const id = Number(elem.getAttribute('shipcellid'));

            return elemCellListId.indexOf(id) !== -1;
        })

        if(isIdBusy.indexOf(true) === -1 || !elemCellListId.length) {
            const ship = shipDetails[currentShip];
            const shipName = ship.name;
    
            elemCellList.map((elem) => {
                elemCellListId.push(Number(elem.getAttribute('shipcellid')));
            })
            setElemCellListId(elemCellListId);
            setShipListDown({
                ...shipListDown,
                [shipName]: elemCellList
            });
            setCurrentShip(++currentShip);
            setElemList([]);
        }
    }

    let flow = (
        <Grid container item xs={5} direction="column">
            <Button variant="contained" color="primary" className="button" onClick={handleShipByMe}>
                Set ship by me
            </Button>
            <Button variant="contained" color="primary" className="button" onClick={handleRandomSetup}>
                Random
            </Button>
        </Grid>
    );

    if(shipByMe) {
        flow = (
            <Grid container item xs={5} direction="column">
                <Button variant="contained" color="primary" className="button" onClick={handleShipOrientationHor}>
                    Horizontal ship
                </Button>
                <Button variant="contained" color="primary" className="button" onClick={handleShipOrientationVer}>
                    Vertical ship
                </Button>
                <Button variant="contained" color="primary" className="button button-random" onClick={handleRandomSetup}>
                    Random
                </Button>
            </Grid>
        );
    }

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
                        <div className="numbers-position">
                            {
                                numberBoardList.map((number) => {
                                    return <div key={number} className="number-cell">{number}</div>;
                                })
                            }
                        </div>
                        <div>
                            {
                                cellList.map((elem) => {
                                    return elem;
                                })
                            }
                        </div>
                        <div className="letter-position">
                            {
                                letterBoardList.map((letter) => {
                                    return <div key={letter} className="letter-cell">{letter}</div>;
                                })
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
