const fs = require("fs");
const path = require("path");
const NodeGraph = require("./NodeGraph");
const GraphBuilder = require("./GraphBuilder");
const { parseFile, serializeGraph } = require("./parse");
const { parseArguments } = require("./utils");

const main = () => {
    if( process.argv.length >= 4 ){
        let args = parseArguments(process.argv);
        
        // Generate file graph,
        let _builder = new GraphBuilder();
        let _graph = _builder.parse(args.entryPoint);

        // Serialize code into a single file,
        let _code = serializeGraph(_graph);
        fs.writeFileSync(args.bundleFile, _code);
    }
    else {
        console.error("Insufficient number of arguments passed.");
    }
};

main();