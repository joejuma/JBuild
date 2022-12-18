
/*========================= # pretty-print.js # =============================*/
const prettyPrint = ( msg ) => {    console.log(`>>\t${msg}`);};
/*========================= # polygon.js # ==================================*/
class Polygon {    constructor(){        let sides = 0;    };};
/*========================= # index.js # ====================================*/

/*========================= # square.js # ===================================*/
class Square extends Polygon {    constructor(){        super();        this.sides = 4;    };    print = () => {        console.log(`I'm a square! I have ${this.sides} sides!`);    };};
/*========================= # index.js # ====================================*/
function helloWorld(){    return "Hello World!";};