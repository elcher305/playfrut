let name = '';
let game = {};
let panel = 'start';
let $ = function (domElement) { return document.querySelector(domElement); };

let nav = () => {
    document.onclick = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case "startGame":
                go('game', 'd-block');
                break;
            case "restart":
                go('game', 'd-block');
                //Тут будем убирать элементы
                break;
        }
    }
}

let go = (page, attribute) => {
    let pages= ['start', 'game', 'end'];
    panel = page;
    $(`#${page}`).setAttribute('class', attribute);
    pages.forEach(el => {
        if(page !== el) $( `#${el}`).setAttribute('class', 'd-none');
    })
}

let startLoop = () => {
    let inter = setInterval( () => {
        checkName();
        if(panel !== 'start') clearInterval(inter);
    }, 100)
}

let checkStorage = () => {
    if(localStorage.getItem('userName') !== null) {
        $(`#nameInput`).value = localStorage.getItem('userName');
    }
}

let checkName = () => {
    name = $(`#nameInput`).value.trim();
    if(name !== '') {
        localStorage.setItem('userName', name);
        $(`#startGame`).removeAttribute('disabled');
    } else {
        $(`#startGame`).setAttribute('disabled', 'disabled');
    }
}

window.onload = () => {
    checkStorage();
    nav();
    startLoop();
    setInterval( () => {
        if(panel === "game") {
            game = new Game();
            game.start();
            panel = 'game process';
        }
    },500 )
}

let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil((max));
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
