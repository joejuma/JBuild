const FileNode = require("../FileNode");

class DependencyGraph {

    /*
        =======================================================================
        # Dependency Graph (class)
        -----------------------------------------------------------------------
        An encapsulating object which manages a collection of nodes and provides
        methods for creating and serializing FileNodes in a directed graph. Used
        to generate dependency graphs.
        =======================================================================
    */
   
    constructor(){
        this.nodes = {};
    }

    addNode( _key, _node ){
        this.nodes[_key] = _node;
    }

    getNode( _key ){
        if( _key in this.nodes ){
            return this.nodes[_key];
        };
        return undefined;
    }

    nodeIn( _key ){
        return !!(_key in this.nodes);
    }

    getDependencySequence(){
        
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

module.exports = DependencyGraph;