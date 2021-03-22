import React, { useEffect, useState } from 'react';

import {
    Grid,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core';


export default function SetupGame() {
    let shipDetails = [
        { 'name': 'ship_4_1', 'length': 4, 'style_class': 'ship-4'},
        { 'name': 'ship_3_1', 'length': 3, 'style_class': 'ship-3' },
        { 'name': 'ship_3_2', 'length': 3, 'style_class': 'ship-3' },
        { 'name': 'ship_2_1', 'length': 2, 'style_class': 'ship-2' },
        { 'name': 'ship_2_2', 'length': 2, 'style_class': 'ship-2' },
        { 'name': 'ship_2_3', 'length': 2, 'style_class': 'ship-2' },
        { 'name': 'ship_1_1', 'length': 1, 'style_class': 'ship-1' },
        { 'name': 'ship_1_2', 'length': 1, 'style_class': 'ship-1' },
        { 'name': 'ship_1_3', 'length': 1, 'style_class': 'ship-1' },
        { 'name': 'ship_1_4', 'length': 1, 'style_class': 'ship-1' },
    ];

    let shipsDonePlayerBase = {
        'ship_4_1': [],
        'ship_3_1': [],
        'ship_3_2': [],
        'ship_2_1': [],
        'ship_2_2': [],
        'ship_2_3': [],
        'ship_1_1': [],
        'ship_1_2': [],
        'ship_1_3': [],
        'ship_1_4': [],
    }
    
    let shipsDoneBotBase = {
        'ship_4_1': [],
        'ship_3_1': [],
        'ship_3_2': [],
        'ship_2_1': [],
        'ship_2_2': [],
        'ship_2_3': [],
        'ship_1_1': [],
        'ship_1_2': [],
        'ship_1_3': [],
        'ship_1_4': [],
    }
    const letterBoardList = ['A','B','C','D','E','F','G','H','I','J',];
    const numberBoardList = ['1','2','3','4','5','6','7','8','9','10',];

    const [shipByMe, setShipByMeFlow] = useState(false);
    const [shipOrientation, setShipOrientation] = useState('h');
    const [setupBoard, setSetupBoard] = useState(false);
    const [setupDone, setSetupDone] = useState(false);
    const [elemCellList, setElemList] = useState([]);
    const [shipListDown, setShipListDown] = useState({});
    const [isWinner, setIsWinner] = useState(false);
    const [isMiss, setIsMiss] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [setupBotBoardProcess, setSetupBotBoardProcess] = useState(true);
    const [isBotTurn, setIsBotTurn] = useState(false);
    const [positionIdsPlayerList, setPositionIdsPlayerList] = useState([]);
    const [elemCellListId, setElemCellListId] = useState([]);
    const [elemBotCellListId, setBotCellListId] = useState([]);
    const [playButton, setPlayButton] = useState(false);
    const [shipPositionsPlayer, setShipPositionsPlayer] = useState({});
    const [shipPositionsBot, setShipPositionsBot] = useState({});
    const [shipsDonePlayer, setShipsDonePlayer] = useState(shipsDonePlayerBase);
    const [shipsDoneBot, setShispDoneBot] = useState(shipsDoneBotBase);
    let [currentShip, setCurrentShip] = useState(0);
    let [difficulty, setDifficultyLevel] = useState(0);
    let [isInfinite, setIsInfinite] = useState(true);

    useEffect(() => {
        if(setupBotBoardProcess) {
            let positionIdsList = [];
        
            for(let pos = 1; pos <= 100; pos++) positionIdsList.push(pos);

            setPositionIdsPlayerList(positionIdsList);
            handleBotRandomSetup();
            console.log(elemBotCellListId); // The bot ship positions. Turn it on for testing. 
            setSetupBotBoardProcess(false);
        } else if(startGame && isBotTurn) {
            const randomNumber = positionIdsPlayerList[Math.floor((Math.random() * positionIdsPlayerList.length) + 1) - 1];
            const randomNumberIndex = positionIdsPlayerList.indexOf(randomNumberIndex);
            let shipCellAttr = `[shipcellid='${randomNumber}']`;
            let elemCell = document.querySelector(shipCellAttr);
            const index = elemCellListId.indexOf(randomNumber);
            
            if(index !== -1) {
                let shipsDone = shipsDonePlayer[shipPositionsPlayer[randomNumber].name]
                elemCell.classList.add(shipPositionsPlayer[randomNumber].style_class);
                shipsDone.push(randomNumber);
                elemCellListId.splice(index, 1);
                setElemCellListId(elemCellListId);
                setShipsDonePlayer(shipsDonePlayer);

                if(shipsDone.length === shipPositionsPlayer[randomNumber].length) {
                    shipsDone.map((positionId) => {
                        shipCellAttr = `[shipcellid='${positionId}']`;
                        elemCell = document.querySelector(shipCellAttr);
                        elemCell.classList.add('ship-cell__success');
                        elemCell.classList.remove(shipPositionsPlayer[randomNumber].style_class);
                    })
                }
            } else {
                elemCell.classList.add('ship-cell__failed');
                elemCell.classList.remove("ship-color");
            }

            if(elemCellListId.length === 0 && difficulty >= 0) {
                setIsWinner(true);
                setStartGame(false);
            } else if(elemCellListId.length > 0 && difficulty === 0) {
                setStartGame(false);
                setIsMiss(true);
            } else if (elemCellListId.length === 0) {
                setIsWinner(true);
                setStartGame(false);
            }

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

    const handleBack = () => {
        let shipCellAttr;
        let elem;
        setShipByMeFlow(!shipByMe);
        setSetupBoard(!setupBoard);
        setElemCellListId([]);
        setShipListDown({});
        setCurrentShip(0);

        for(let pos = 1; pos <= 100; pos++) {
            shipCellAttr = `[shipcellid='${pos}']`;
            elem = document.querySelector(shipCellAttr);
            elem.classList.remove('ship-color');
        }
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
            const ship = shipDetails[count];
            const shipLength = ship.length;
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
                    shipPositionsPlayer[posCellHor] = ship;
                    
                }
                setShipPositionsPlayer(shipPositionsPlayer);
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
                    shipPositionsPlayer[posCellVer] = ship;
                }
                setShipPositionsPlayer(shipPositionsPlayer);
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
            let shipPositionId;
            
            elemCellList.map((elem) => {
                shipPositionId = Number(elem.getAttribute('shipcellid'));
                elemCellListId.push(shipPositionId);
                shipPositionsPlayer[shipPositionId] = ship;
            })
            setShipPositionsPlayer(shipPositionsPlayer);
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

    const handleDifficultyLable = (event) => {
        const difficultyId = event.target.value;

        setDifficultyLevel(difficultyId);
        if (difficultyId !== 0) {
            setIsInfinite(false);
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

    let setupSteps = (
        <Grid container item xs={5} direction="column">
            <Button variant="contained" color="primary" className="button set_by_me_button" onClick={handleShipByMe}>
                Set ship by me
            </Button>
            <Button variant="contained" color="primary" className="button random_button" onClick={handleRandomSetup}>
                Random
            </Button>
            <FormControl  variant="filled" className="label-section">
                <InputLabel className="label-title">Choose the difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    onChange={handleDifficultyLable}
                    className="difficulty-label"
                >
                    <MenuItem value={0}>Easy: ∞ turns</MenuItem>
                    <MenuItem value={100}>Medium: 100 turns</MenuItem>
                    <MenuItem value={50}>Hard: 50 turns</MenuItem>
                </Select>
            </FormControl>
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
                <Button variant="contained" color="primary" className="button-back" onClick={handleBack}>
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
        
        let elemCell = elem.target;
        let elemClassList = elemCell.classList;
        
        if(
            elemClassList.contains('ship-cell__failed') ||
            elemClassList.contains('ship-cell__success') ||
            elemClassList.contains('ship-4') ||
            elemClassList.contains('ship-3') ||
            elemClassList.contains('ship-2') ||
            elemClassList.contains('ship-1')
        ) {
            return;
        }
        
        let shipCellAttr;
        const id = Number(elemCell.getAttribute('shipbotcellid'));
        const index = elemBotCellListId.indexOf(id);

        
        if(index !== -1) {
            let shipsDone = shipsDoneBot[shipPositionsBot[id].name]
            elemCell.classList.add(shipPositionsBot[id].style_class);
            shipsDone.push(id);
            elemBotCellListId.splice(index, 1);
            setBotCellListId(elemBotCellListId);
            setShispDoneBot(shipsDoneBot);

            if(shipsDone.length === shipPositionsBot[id].length) {
                shipsDone.map((positionId) => {
                    shipCellAttr = `[shipbotcellid='${positionId}']`;
                    elemCell = document.querySelector(shipCellAttr);
                    elemCell.classList.add('ship-cell__success');
                    elemCell.classList.remove(shipPositionsBot[id].style_class);
                })
            }

        } else {
            elemCell.classList.add('ship-cell__failed');
        }
        
        if(isInfinite) {
            setDifficultyLevel(++difficulty);
        } else {
            setDifficultyLevel(--difficulty);
        }

        if(elemBotCellListId.length === 0 && difficulty >= 0) {
            setIsWinner(true);
            setStartGame(false);
        } else if(elemBotCellListId.length > 0 && difficulty === 0) {
            setStartGame(false);
            setIsMiss(true);
        } else if (elemBotCellListId.length === 0) {
            setIsWinner(true);
            setStartGame(false);
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
            const ship = shipDetails[count];
            const shipLength = ship.length;
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
                    shipPositionsBot[posCellHor] = ship;
                }
                setShipPositionsBot(shipPositionsBot);
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
                    shipPositionsBot[posCellVer] = ship;
                }
                setShipPositionsBot(shipPositionsBot);
                setBotCellListId(elemBotCellListId);
            }
        };
    };

    const shipStyles = () => {
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

    const titleInfo = () => {
        let titleName = 'SETUP GAME';

        if(isWinner) {
            titleName = '*** WINNER ***';
        } else if(!startGame && isMiss) {
            titleName = '*** GAME OVER ***';
        } else if(setupDone) {
            titleName = 'PLAYING...';
        }
        
        return titleName;
    }

    const resetDashboard = () => {
        window.location.reload();
    }

    const turnsSection = () => {
        if(setupDone) {
            return (
                <Grid container item xs={12} className='header-title__turns' justify="center" alignItems="center">
                    <h2 className="title">{difficulty}</h2>
                </Grid>
            );
        }
    }
    
    const resetSection = () => {
        
        if(setupDone && !startGame) {
            return (
                <Grid container item xs={12} className='header-title__reset' justify="center" alignItems="center">
                    <Button variant="contained" color="primary" onClick={resetDashboard}>
                        Try again
                    </Button>
                </Grid>
            );
        }
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} className='header-title' justify="center" alignItems="center">
                <h2 className="title">{titleInfo()}</h2>
            </Grid>
            {turnsSection()}
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
                {setupDone && shipStyles()}
                {resetSection()}
            </Grid>
        </Grid>
    );
}
