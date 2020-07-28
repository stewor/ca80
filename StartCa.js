
let tab = new Array(56);
tab.fill('on');
let emptySquare = true;
let speed = 800;
const a = document.querySelector('.digit1').children;
const b = document.querySelector('.digit2').children;
const c = document.querySelector('.digit3').children;
const d = document.querySelector('.digit4').children;
const e = document.querySelector('.digit5').children;
const f = document.querySelector('.digit6').children;
const g = document.querySelector('.digit7').children;
const linePlayer = document.querySelector('.digit8').children;
const narrowUp = document.querySelector('.fa-arrow-alt-circle-up');
const narrowDown = document.querySelector('.fa-arrow-alt-circle-down');
const tabLetter = [a, b, c, d, e, f, g];
let audioStart = document.getElementById("play");
let audioLost = document.getElementById("lost");
let tabLine = ['on', 'on', 'on', '', 'on', 'on', 'on'];
let counter = 0;
let inter;
let convertTab;
let firstStart = true;
function collision() {

    if ((tab[54] === '' && tabLine[6] === '') || (tab[54] === '' && tabLine[3] === '') || (tab[51] === '' && tabLine[3] === '') || (tab[51] === '' && tabLine[0] === '')) {
        clearInterval(inter);
        document.removeEventListener('keydown', keyDown);
        narrowUp.removeEventListener('click', up);
        narrowDown.removeEventListener('click', down);
        audioLost.play();
        setTimeout(clearDisplay, 1000);
        return;
    } else {
        counter++;
        readTab();
        speedTime();
    }
};

function speedTime() {
    speed -= 3;
    clearInterval(inter);
    inter = setInterval(collision, speed);
}

const readTab = function () {
    audioStart.play();
    let num = 0;
    for (let i = 0; i < tabLetter.length; i++) {
        for (let j = 0; j < tabLetter[i].length; j++) {
            if (tab[num] === 'on') {
                tabLetter[i][j].classList.add('on');
            } else {
                tabLetter[i][j].classList.remove('on');
            }
            num++;
        }
    }
    shiftTab();
};

function readMovePlayer() {
    for (let i = 0; i < tabLetter.length; i++) {
        if (tabLine[i] !== 'on') {
            linePlayer[i].classList.remove('on');
        } else {
            linePlayer[i].classList.add('on');
        };
    }
}

const clearDisplay = function () {

    for (let i = 0; i < tabLetter.length; i++) {
        for (let j = 0; j < tabLetter[i].length; j++) {
            tabLetter[i][j].classList.add('on');

        }
    }
    for (let i = 0; i < linePlayer.length; i++) {
        linePlayer[i].classList.add('on');
    }
    let strCounter = counter.toString();
    let temp = [];
    for (let i = 0; i < strCounter.length; i++) {
        temp.unshift(Number(strCounter.charAt(i)));
    }
    displayScore(temp);
    startGame();
};

const startAgain = function () {
    narrowUp.addEventListener('click', playAgain);
    narrowDown.addEventListener('click', playAgain);
    document.addEventListener('keydown', playAgain);
}
const convertNumber = function (number) {
    switch (number) {
        case 0: {
            return convertTab = [0, 1, 2, 4, 5, 6];
        }
        case 1: {
            return convertTab = [2, 5];
        }
        case 2: {
            return convertTab = [0, 2, 3, 4, 6];
        }
        case 3: {
            return convertTab = [0, 2, 3, 5, 6];
        }
        case 4: {
            return convertTab = [1, 2, 3, 5];
        }
        case 5: {
            return convertTab = [0, 1, 3, 5, 6];
        }
        case 6: {
            return convertTab = [0, 1, 3, 4, 5, 6];
        }
        case 7: {
            return convertTab = [0, 2, 5];
        }
        case 8: {
            return convertTab = [0, 1, 2, 3, 4, 5, 6];
        }
        case 9: {
            return convertTab = [0, 1, 2, 3, 5, 6];
        }
        default: return convertTab = [];
    }
}
const shiftTab = function () {
    for (let i = 0; i < a.length; i++) {
        tab.pop();
        tab.unshift('on');
    }
    rand();
};

const rand = function () {
    if (emptySquare) {
        let ran = Math.floor(Math.random() * 3);
        if (ran === 1) {
            tab[0] = '';
            tab[1] = '';
            tab[2] = '';
            tab[3] = '';
        }
        if (ran === 2) {
            tab[4] = '';
            tab[5] = '';
            tab[6] = '';
            tab[3] = '';
        }
        emptySquare = !emptySquare;
    } else {
        emptySquare = !emptySquare;
    }
};

const up = function () {
    if (tabLine[3] === '') {
        tabLine[3] = 'on';
        tabLine[0] = '';
    }
    if (tabLine[6] === '') {
        tabLine[3] = '';
        tabLine[6] = 'on';
    }
    readMovePlayer();
};

const down = function () {
    if (tabLine[3] === '') {
        tabLine[3] = 'on';
        tabLine[6] = '';
    }
    if (tabLine[0] === '') {
        tabLine[3] = '';
        tabLine[0] = 'on';
    }
    readMovePlayer();
};

function keyDown(e) {
    let code = e.keyCode ? e.keyCode : e.which;
    if (code === 38) {
        up();
    } else if (code === 40) {
        down();
    }
};
const displayScore = function (temp) {
    if (typeof temp[0] !== "undefined") {
        let tempA = convertNumber(temp[0]);
        for (let i = 0; i < tempA.length; i++) {
            linePlayer[tempA[i]].classList.remove('on')
        };
    }
    if (typeof temp[1] !== "undefined") {
        let tempA = convertNumber(temp[1]);
        for (let i = 0; i < tempA.length; i++) {
            g[tempA[i]].classList.remove('on')
        };
    }
    if (typeof temp[2] !== "undefined") {
        let tempA = convertNumber(temp[2]);
        for (let i = 0; i < tempA.length; i++) {
            f[tempA[i]].classList.remove('on')
        };
    }
    if (typeof temp[3] !== "undefined") {
        let tempA = convertNumber(temp[3]);
        for (let i = 0; i < tempA.length; i++) {
            e[tempA[i]].classList.remove('on')
        };
    }
};
function movePlayer() {
    narrowUp.addEventListener('click', up);
    narrowDown.addEventListener('click', down);
};
function startGame() {
    if (firstStart) {
        narrowUp.classList.add('animation');
        narrowUp.addEventListener('click', addStart);
        firstStart = false;
    } else {
        tab.fill('on');
        emptySquare = true;
        speed = 800;
        narrowUp.classList.add('animation');
        narrowUp.addEventListener('click', addStart);
    }

};
function addStart(e) {

    if (e) {
        narrowUp.classList.remove('animation');
        for (let i = 0; i < tabLetter.length; i++) {
            for (let j = 0; j < tabLetter[i].length; j++) {
                tabLetter[i][j].classList.add('on');
            }
        }
        for (let i = 0; i < linePlayer.length; i++) {
            linePlayer[i].classList.add('on');
        }
        linePlayer[3].classList.remove('on')
        narrowUp.removeEventListener('click', addStart);
        document.addEventListener('keydown', keyDown);
        movePlayer();
        inter = setInterval(collision, speed);
    }
}
startGame();



