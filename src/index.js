const fs = require("fs");
const { parseArguments } = require("./jbuild/utils");
const jbuild = require("./jbuild");

const printUsage = () => {
    console.log("Example usage\n`jbuild ./path/to/entrypoint.js ./path/to/bundle.js");
};

const main = () => {
    if( process.argv.length >= 4 ){
        let args = parseArguments(process.argv);
        
        // Generate file graph,
        let _graph = jbuild.analyzeProject(args.entryPoint, args.language);

        // Serialize code into a single file,
        let _code = jbuild.serializeGraph(_graph);
        fs.writeFileSync(args.bundleFile, _code);
    }
    else {
        console.error("Insufficient number of arguments passed.");
        printUsage();
    }
};

main();