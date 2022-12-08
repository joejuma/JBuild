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
        this.code = "";
        this.children = [];
        this.parents = [];  // aka "Dependencies"
    }

    /* Distance Methods */
    recalculateDistance(){
        
        // Get maximum child distance +1,
        for( let i = 0; i < this.children.length; i++ ){
            if( this.distance <= this.children[i].distance ){
                this.distance = this.children[i].distance + 1;
            };
        };

        // Remind dependencies to update their distances as well,
        this.parents.map( parent => parent.recalculateDistance());
        return;
    }

    /* Relation Management Methods */
    addChild = ( child ) => {
        this.children.push(child);
        this.recalculateDistance();
    };

    addParent( parent ){
        if( parent !== undefined ){    
            this.parents.push(parent);
            return;
        };
        console.error("[ERROR] An undefined parent value was passed into FileNode.addParent()");
        return;
    };

    addDependency( parent ){
        this.addParent( parent );
        parent.addChild(this);
    };

    /* Content Methods */
    setContent = ( _content = "" ) => {
        this.content = _content;
    };
}

module.exports = FileNode;