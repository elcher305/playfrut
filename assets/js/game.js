class Drawable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.w= 0;
        this.h = 0;
        this.offsets = {
            x: 0,
            y: 0
        };
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.className = "element " + this.constructor.name.toLowerCase();
        $(`.elements`).append(this.element);
    }

    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }

    draw() {
        this.element.style = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.w}px;
            height: ${this.h}px;
        `;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.createElement();
    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.players = this.generate(Player);
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    start() {
        this.loop();
    }

    loop() {
        requestAnimationFrame(() => {
            this.updateElement();
            this.setParams();
            this.loop();
        });
    }

    updateElement() {
        this.elements.forEach(element => {
            element.update();
            element.draw();
        })
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((el, ind) => {
            $(`#${el}`).innerHTML = values[ind];
        })
    }
}
