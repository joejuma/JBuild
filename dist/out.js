
/*========================= # Section # =====================================*/
function helloWorld(){    return "Hello World!";};
/*========================= # Section # =====================================*/
class Square extends Polygon {    constructor(){        super();        this.sides = 4;    };    print = () => {        console.log(`I'm a square! I have ${this.sides} sides!`);    };};
/*========================= # Section # =====================================*/
class Polygon {    constructor(){        let sides = 0;    };};