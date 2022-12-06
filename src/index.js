const fs = require("fs");
const path = require("path");
const NodeGraph = require("./NodeGraph/NodeGraph_class");
const parse = require("./parse");

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
        
        // Generate file graph,
        let _graph = new NodeGraph();
        _graph.addNode(parse.parseFile(args.inputFile, _graph));

        // Serialize code into a single file,
        let _code = parse.serializeGraph(_graph);
        fs.writeFileSync(args.outputFile, _code);
    }
    else {
        console.error("Insufficient number of arguments passed.");
    }
};

main();