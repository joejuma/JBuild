const FileNode = require("../FileNode/FileNode_class.js");

class NodeGraph {

    /*
        =======================================================================
        # Node Graph (class)
        ---
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
        let seq = [];
        
        // Generate nested sequence,
        let keys = Object.keys(this.nodes);
        for( let i = 0; i < keys.length; i++){
            let _node = this.nodes[keys[i]];  // for simplicity.
            if((seq.length - 1) < _node.distance){
                seq.push([]);
            };
            seq[_node.distance].push(_node);
        };

        // Return sequence flattened down to 1-level.
        return seq.flat();
    }
}

module.exports = NodeGraph;