class FileNode {
   
    /*
        =======================================================================
        # File Node (class)
        -----------------------------------------------------------------------
        A node which stores basic information about a file and can be given a
        nickname. Has the ability to store what nodes depend on it ("children")
        and what nodes it depends on ("parents"). Useful for creating a file
        dependency graph.
        =======================================================================
    */

    constructor( name = "DEFAULT_FILE_NODE_NAME", filePath = "" ){

        /* Metadata */
        this.name = name;
        this.filePath = filePath;

        /* Node Data */
        this.distance = 0;
        this.children = [];
        this.parents = [];  // aka "Dependencies"
    }

    updateNodeDistance(){
        // Get max child distance + 1,
        for( let i = 0; i < this.children.length; i++){
            if( this.distance <= this.children[i].distance ){
                this.distance = this.children[i].distance + 1;
            };
        };
        // Update parents so distances are kept sensible.
        this.parents.map( parent => parent.updateNodeDistance());
    };

    _addChild( child ){
        this.children.push(child);
        this.updateNodeDistance();
    };

    _addParent( parent ){
        this.parents.push(parent);
    };

    addParent( parent ){
        this._addParent( parent );
        parent._addChild(this);
    };
}

module.exports = FileNode;