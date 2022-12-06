const FileNode = require("../FileNode");

class NodeGraph {

    /*
        =======================================================================
        # Node Graph (class)
        -----------------------------------------------------------------------
        An encapsulating object which manages a collection of nodes and provides
        methods for creating and serializing FileNodes in a directed graph. Used
        to generate dependency graphs.
        =======================================================================
    */
   
    constructor(){
        this.nodes = {};
    }

    addNode( name = undefined, filePath = undefined ){
        let _node = new FileNode(name, filePath);
        this.nodes[filePath] = _node;
        return this.nodes[filePath];
    }

    getNodeDependencySequence(){
        
        // Get the node keys which are valid,
        let seq = [];
        let keys = Object.keys(this.nodes).filter((k) => {
            return !(( k === undefined )||( k === "undefined" ));
        });

        // Put the nodes into a nested Array, with the sub-array based on distance,
        for( let i = 0; i < keys.length; i++){
            let _node = this.nodes[keys[i]];  // for simplicity.
            while((seq.length - 1) < _node.distance){
                seq.push([]);
            };
            seq[_node.distance].push(_node);
        };

        // Return sequence flattened down to 1-level.
        return seq.flat();
    }
}

module.exports = NodeGraph;