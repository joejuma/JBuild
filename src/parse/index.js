/* Deps */
const fs = require("fs");
const path = require("path");
const NodeGraph = require("../NodeGraph/NodeGraph_class.js");

/* Functions */

const extractDependency = ( _code = "", lineRegex = undefined, extractRegex = undefined ) => {

    let lineRegExp = RegExp(lineRegex);
    let data = {
        code: String(_code),
        deps: []
    };

    let line = lineRegExp.exec(data.code);
    let dep = undefined;
    while( line !== null ){
        dep = new RegExp(extractRegex).exec(line[0]);   // new keyword mandatory, or it will persist the prior RegEx state and bug out.
        data.deps.push(dep[1]);
        data.code = data.code.replace(dep.input, "");
        line = lineRegex.exec(_code);
    };

    return data;
};

const processCode = ( _code = "" ) => {
    
    // Setup return object,
    let data = {
        code: String(_code),
        deps: []
    };

    // Describ syntax specifications,
    let syntaxes = [
        {
            name: "require",
            line: /(.*?) = require\(["'](.*?)['"]\);/g,
            extract: /require\(["'](.*?)["']\)/g
        },
        {
            name: "import",
            line: /import (.*?) from ['"](.*?)['"];/g,
            extract: /from ['"](.*?)['"]/g
        }
    ];

    // Run sytax parsing,
    syntaxes.map((syntax) => {
        let digest = extractDependency(data.code, syntax.line, syntax.extract);
        data.deps.push(...digest.deps);
        data.code = digest.code;
    });

    // Return processed code & dependencies.
    return data;
};

const parseFile = ( _filepath, _graph = new NodeGraph() ) => {

    // Create a node & process code,
    let _node = _graph.addNode(_filepath,_filepath);
    let _data = processCode(fs.readFileSync(_filepath));
    _node.setCode(_data.code);
    
    // For each dependency, try processing it & linking to current node,    
    for( let i = 0; i < _data.deps.length; i++){
        if(_graph.nodes[_data.deps[i]] !== undefined ){
            _node.addParent(_graph.nodes[_data.deps[i]]);
        }
        else {
            _node.addParent(parseFile(_data.deps[i], _graph));
        };
    };

    // Return this node.
    return _node;
};

module.exports = {
    extractDependency,
    processCode,
    parseFile,
};