/* Deps */
const FileNode = require("../FileNode");
const NodeGraph = require("../NodeGraph");

// @todo: remove dependencies once logic is no longer needed.
const { parseFile } = require("../parse");

/* Class */
class GraphBuilder {
    /*
        =======================================================================
        # Graph Builder (class)
        -----------------------------------------------------------------------
        Given an entry-point file, will construct a dependency graph of the 
        code-base from that entry-point.
        =======================================================================
    */

    constructor(){
        // ...
    }

    generateDefaultConfigObject = () => {
        return {
            cwd: "."
        };
    };

    parse = ( _entry = "", _config = this.generateDefaultConfigObject() ) => {
        // @todo: flesh this out, and clean its behavior up.
        let _graph = new NodeGraph();
        _graph.addNode(parseFile(_entry, _graph));
        return _graph;
    };
}

module.exports = GraphBuilder;