const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const NodeGraph = require("./NodeGraph/NodeGraph_class.js");

/*
let graph = new NodeGraph();

let root = graph.addNode("root");
let dep1 = graph.addNode("dep-1","./dep1.js");
let dep2 = graph.addNode("dep-2","./dep-2.js");
let dep3 = graph.addNode("dep-3", "./dep-3.js");

dep3.addParent(dep2);

root.addParent(dep1);
root.addParent(dep2);
root.addParent(dep3);

console.log(graph);
console.log("Dependency sequence:");
graph.getNodeDependencySequence().map( n => console.log(n.name));
*/

const extractDependency = ( _code = "", lineRegex = undefined, extractRegex = undefined ) => {

    let lineRegExp = RegExp(lineRegex);
    let data = {
        code: String(_code),
        deps: []
    };

    let line = lineRegExp.exec(data.code);
    let dep = undefined;
    while( line !== null ){
        dep = new RegExp(extractRegex).exec(line[0]);   // new keyword mandatory, or it will persist the prior RegEx state and bug out.
        data.deps.push(dep[1]);
        data.code = data.code.replace(dep.input, "");
        line = lineRegex.exec(_code);
    };

    return data;
};

const processCode = ( _code = "" ) => {
    
    // Setup return object,
    let data = {
        code: String(_code),
        deps: []
    };

    // Describ syntax specifications,
    let syntaxes = [
        {
            name: "require",
            line: /(.*?) = require\(["'](.*?)['"]\);/g,
            extract: /require\(["'](.*?)["']\)/g
        },
        {
            name: "import",
            line: /import (.*?) from ['"](.*?)['"];/g,
            extract: /from ['"](.*?)['"]/g
        }
    ];

    // Run sytax parsing,
    syntaxes.map((syntax) => {
        let digest = extractDependency(data.code, syntax.line, syntax.extract);
        data.deps.push(...digest.deps);
        data.code = digest.code;
    });

    // Return processed code & dependencies.
    return data;
};

const parseArguments = ( argv ) => {
    let args = {
        inputFile: undefined,
        outputFile: undefined,
        lang: "JS"  // @todo: add multi-language support later.
    };

    args.inputFile = path.resolve(argv[2]);
    args.outputFile = path.resolve(argv[3]);

    return args;
};

const main = () => {
    if( process.argv.length >= 4 ){
        
        let args = parseArguments(process.argv);
        let toVisit = [args.inputFile].filter( arg => arg !== undefined);
        let visited = [];
        
        while( toVisit.length > 0) {

            // Get the next file,
            let current = toVisit[0];
            toVisit = toVisit.slice(1);

            // Parse the file,
            let _code = fs.readFileSync(current);
            let _data = processCode(_code);
            console.log(_data);

            // need to extract _data.code and put it somewhere.
            // need to extract _data.deps and build it into a graph somewhere.
            
            // Build the graph,
            // @todo: add behavior for recursively stepping through files and building the graph
            // similar to the above commented out graph.

            // On to the next file!
            visited.push(current);
        };
    }
    else {
        console.error("Insufficient number of arguments passed.");
    }
};

main();