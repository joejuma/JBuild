const Polygon = require("./polygon.js");

class Square extends Polygon {

    constructor(){
        super();
        this.sides = 4;
    };

    print = () => {
        console.log(`I'm a square! I have ${this.sides} sides!`);
    };
};

module.exports = Square;