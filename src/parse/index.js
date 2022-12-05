/* Deps */
const fs = require("fs");
const path = require("path");
const NodeGraph = require("../NodeGraph/NodeGraph_class.js");
const { printBanner, stripEmptyLines, stripComments } = require("../utils/index.js");

/* Functions */

const extractDependency = ( _code = "", lineRegex = undefined, extractRegex = undefined, _cwd = undefined ) => {

    let lineRegExp = RegExp(lineRegex);
    let data = {
        code: String(_code),
        deps: []
    };

    let line = lineRegExp.exec(data.code);
    let dep = undefined;
    while( line !== null ){
        dep = new RegExp(extractRegex).exec(line[0]);   // new keyword mandatory, or it will persist the prior RegEx state and bug out.
        let _fp = path.join( _cwd, dep[1]);
        if( fs.existsSync(_fp) === true){
            data.deps.push(_fp);
            data.code = data.code.replace(dep.input, "");
        };
        line = lineRegex.exec(_code);
    };

    data.code = clearExport(data.code);
    return data;
};

const clearExport = ( _code = "" ) => {
    let newCode = _code;

    let rgx = /module.exports( )=( )([\s\S.]*?)[};]/g;
    let lineRegex = new RegExp(rgx);
    let line = lineRegex.exec(newCode);
    
    while( line !== null ){
        newCode = _code.replace(lineRegex, "");
        line = lineRegex.exec(newCode);
    };
    return newCode;
};

const processCode = ( _code = "", _cwd = "" ) => {
    
    // Setup return object,
    let data = {
        code: stripComments(String(_code)),
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
        let digest = extractDependency(data.code, syntax.line, syntax.extract, _cwd);
        data.deps.push(...digest.deps);
        data.code = digest.code;
    });

    // Return processed code & dependencies.
    return data;
};

const parseFile = ( _filepath, _graph = new NodeGraph() ) => {

    // Create a node & process code,
    let _node = _graph.addNode(_filepath,_filepath);
    let _data = processCode(fs.readFileSync(_filepath), path.join(_filepath, ".."));
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

const serializeGraph = ( _graph ) => {
    let _code = "";
    let _nodes = _graph.getNodeDependencySequence();

    for( let i = 0; i < _nodes.length; i++){
        _code += printBanner("Section");
        _code += stripEmptyLines(_nodes[i].code);
    };
    return _code;
};

module.exports = {
    extractDependency,
    processCode,
    parseFile,
    serializeGraph,
};