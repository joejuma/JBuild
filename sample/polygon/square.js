const Polygon = require("./polygon.js");

class Square extends Polygon {

    constructor(){
        super();
        this.sides = 4;
    };
}

module.exports = Square;