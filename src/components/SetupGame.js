import React, { useEffect, useState } from 'react';

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
    const [setupDone, setSetupDone] = useState(false);
    const [elemCellList, setElemList] = useState([]);
    const [shipListDown, setShipListDown] = useState({});
    const [isWinner, setIsWinner] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [setupBotBoardProcess, setSetupBotBoardProcess] = useState(true);
    const [isBotTurn, setIsBotTurn] = useState(false);
    const [positionIdsPlayerList, setPositionIdsPlayerList] = useState([]);
    const [elemCellListId, setElemCellListId] = useState([]);
    const [elemBotCellListId, setBotCellListId] = useState([]);
    const [playButton, setPlayButton] = useState(false);
    let [currentShip, setCurrentShip] = useState(0);

    useEffect(() => {
        if(setupBotBoardProcess) {
            let positionIdsList = [];
        
            for(let pos = 1; pos <= 100; pos++) positionIdsList.push(pos);

            setPositionIdsPlayerList(positionIdsList);
            handleBotRandomSetup();
            setSetupBotBoardProcess(false);
        } else if(startGame && isBotTurn) {
            const randomNumber = positionIdsPlayerList[Math.floor((Math.random() * positionIdsPlayerList.length) + 1) - 1];
            const randomNumberIndex = positionIdsPlayerList.indexOf(randomNumberIndex);
            const shipCellAttr = `[shipcellid='${randomNumber}']`;
            const elemCell = document.querySelector(shipCellAttr);
            const index = elemCellListId.indexOf(randomNumber);
            
            if(index !== -1) {
                elemCell.classList.add('ship-cell__success');
                elemCell.classList.remove("ship-color");
                elemCellListId.splice(index, 1);
                setElemCellListId(elemCellListId);

                if(elemCellListId.length === 0) {
                    setIsWinner(true);
                    setStartGame(false);
                }
            } else {
                elemCell.classList.add('ship-cell__failed');
                elemCell.classList.remove("ship-color");
            }
            // console.log(elemCellListId)
            positionIdsPlayerList.splice(randomNumberIndex, 1);
            setPositionIdsPlayerList(positionIdsPlayerList);
            setIsBotTurn(false);
        }
    });

    let cellList = [];

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

    const handlePlayGame = () => {
        setSetupBoard(false);
        setSetupDone(true);
        setStartGame(true);
    }

    const handleRandomSetup = () => {
        setSetupBoard(!setupBoard);
        let positionIdsList = [];
        let shipOrientationId;
        const shipOrientation = ['hor', 'ver'];

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
        setSetupBoard(false);
        setSetupDone(true);
        setStartGame(true);
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
        if(startGame || !setupBoard) {
            return;
        }
        
        const isIdBusy = elemCellList.map((elem) => {
            const id = Number(elem.getAttribute('shipcellid'));

            return elemCellListId.indexOf(id) !== -1;
        })

        
        if(isIdBusy.indexOf(true) === -1) {
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

        if(elemCellListId.length === 20) {
            setPlayButton(true);
            setSetupBoard(false);
        }
    }

    const playBoardTitles = (
        <Grid container item xs={12} spacing={4}  className="playe-board__head">
            <Grid container item xs={6} justify="center" alignItems="center">
                <div className="title title-bot">BOT</div>
            </Grid>
            <Grid container item xs={6} justify="center" alignItems="center">
                <div className="title title-player">PLAYER</div>
            </Grid>
        </Grid>
    );

    let setupSteps = (
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
        const isPlayButton = playButton ? false : true;

        setupSteps = (
            <Grid container item xs={5} direction="column">
                <Button variant="contained" color="primary" className="button" onClick={handleShipOrientationHor}>
                    Horizontal ship
                </Button>
                <Button variant="contained" color="primary" className="button" onClick={handleShipOrientationVer}>
                    Vertical ship
                </Button>
                <Button variant="contained" disabled={isPlayButton} color="primary" className="button-play button-random" onClick={handlePlayGame}>
                    Play
                </Button>
                <Button variant="contained" color="primary" className="button-back">
                    Back
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
    
    const handleBotMouseClick = (elem) => {
        if(isBotTurn || !startGame) {
            return;
        }
        elem.preventDefault();
        const elemCell = elem.target;
        const id = Number(elemCell.getAttribute('shipbotcellid'));
        const index = elemBotCellListId.indexOf(id);
        
        if(index !== -1) {
            elemCell.classList.add('ship-cell__success');
            elemBotCellListId.splice(index, 1);
            console.log(elemBotCellListId);
            setBotCellListId(elemBotCellListId);

            if(elemBotCellListId.length === 0) {
                setIsWinner(true);
                setStartGame(false);
            }
        } else {
            elemCell.classList.add('ship-cell__failed');
        }

        setIsBotTurn(true);
    }

    const handleBotRandomSetup = () => {
        if(startGame) {
            return;
        }
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
    
            shipOrientationId = shipOrientation[Math.floor((Math.random() * 2) + 1) - 1];
    
            if(shipOrientationId === 'hor') {
                endPoint = randomNumber + shipLength - 2;
    
                do {
                    cellEndPoint = randomNumber + shipLength - 1;
                    isCellBusy = false;
                    for(let posCellHorBusy = randomNumber; posCellHorBusy <= cellEndPoint; posCellHorBusy++) {
                        if(elemBotCellListId.indexOf(posCellHorBusy) !== -1) {
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
                    elemBotCellListId.push(posCellHor);
                }
                setBotCellListId(elemBotCellListId);
            } else {
                endPoint = (shipLength * 10) - 10;
    
                do {
                    cellEndPoint = randomNumber + ((shipLength - 1) * 10);
                    isCellBusy = false;
                    for(let posCellVerBusy = randomNumber; posCellVerBusy <= cellEndPoint; posCellVerBusy+=10) {
                        if(elemBotCellListId.indexOf(posCellVerBusy) !== -1) {
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
                    elemBotCellListId.push(posCellVer);
                }
                setBotCellListId(elemBotCellListId);
            }
        };
    };

    const setupBotBoard = () => {
        let cellBotList = [];

        for(let num = 1; num <= 100; num++) {
            cellBotList.push(
                (<div
                    key={num}
                    className="ship-cell"
                    shipbotcellid={num}
                    onMouseDown={handleBotMouseClick}
                >
                </div>)
            );
        }

        return (
            <div className="board">
                <div className="numbers-position">
                    {
                        numberBoardList.map((number) => {
                            return <div key={number} className="number-cell">{number}</div>;
                        })
                    }
                </div>
                <div>
                    {
                        cellBotList.map((elem) => {
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
        );
    }

    const titleInfo = () => {
        let titleName = 'SETUP GAME';

        if(isWinner) {
            titleName = '*** WINNER ***';
        } else if(setupDone) {
            titleName = 'PLAYING...';
        }

        return titleName;
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} className='header-title' justify="center" alignItems="center">
                <h2 className="title">{titleInfo()}</h2>
            </Grid>
            <Grid container item xs={12} spacing={6} className="board-area">
                {setupDone && playBoardTitles}
                <Grid container item xs={6} direction="column" alignItems="flex-end">
                    {setupDone ? setupBotBoard() : setupSteps}
                </Grid>
                <Grid container item xs={6}>
                    <div className="board">
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
