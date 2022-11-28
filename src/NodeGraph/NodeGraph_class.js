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
        this.nodes = [];
    }

    addNode( name = undefined, filePath = undefined ){
        let _node = new FileNode(name, filePath);
        this.nodes.push(_node);
        return this.nodes[this.nodes.length - 1];
    }

    getNodeDependencySequence(){
        let seq = [];
        
        // Generate nested sequence,
        for( let i = 0; i < this.nodes.length; i++){
            let _node = this.nodes[i];  // for simplicity.
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