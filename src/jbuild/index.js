/* Deps */
const DependencyGraph = require("../DependencyGraph");
const fs = require("fs");
const path = require("path");
const FileNode = require("../FileNode");
const { createAnalyzer } = require("./codeAnalyzers");
const { printBanner } = require("./utils");

/* Functions */
const analyzeProject = ( _input, _lang = "JS" ) => {
    let _graph = new DependencyGraph();
    let _analyzer = createAnalyzer(_lang);
    _graph.addNode(_input, analyzeFile( _input, _graph, _analyzer ));
    return _graph;
};

const analyzeFile = ( _filepath, _graph, _analyzer ) => {
    
    console.log(`| Analyzing file ${_filepath}...`); // @jjuma: remove.

    // Create the current node & analyze the associated file,
    let _node = new FileNode();
    let _code = String(fs.readFileSync( _filepath ));
    let cwd = path.dirname(_filepath);
    let _data = _analyzer.analyze(_code, cwd);
    _node.content = _data.code;
    _node.name = path.basename(_filepath);
    _graph.addNode(_filepath,_node);    // This step is so that sub-calls see this node in the graph and don't replicate it.

    // For each dependency, either add it if it already exists in graph, or analyze the corresponding file & add it.
    _data.dependencies.map((key) => {
        
        let dependency = undefined;
        if( _graph.nodeIn(key)){
            console.log(`Found ${key} in graph, bypassing node analysis...`);
            dependency = _graph.getNode(key);
        }
        else {
            console.log(`Did not find ${key} in graph, analyzing file...`);
            dependency = analyzeFile( key, _graph, _analyzer );
        };
        
        _node.addDependency(dependency);
    });

    return _node;
};

const serializeGraph = ( _graph ) => {
    let _content = "";
    let _nodes = _graph.getDependencySequence();

    for( let i = (_nodes.length - 1); i >= 0; i--){ // inverse iterate so dependencies are first in the serialized format,
        _content += printBanner(_nodes[i].name);
        _content += _nodes[i].content;
    };
    return _content;
};

module.exports = {
    analyzeProject,
    analyzeFile,
    serializeGraph,
};