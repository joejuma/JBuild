/* Deps */
const fs = require("fs");
const path = require("path");
const NodeGraph = require("../NodeGraph/index.js");
const { printBanner, stripComments, cleanCode } = require("../utils/index.js");

/* Functions */

const extractDependency = ( _content = "", lineRegex = undefined, extractRegex = undefined, _cwd = undefined ) => {

    let lineRegExp = RegExp(lineRegex);
    let data = {
        content: String(_content),
        deps: []
    };

    let line = lineRegExp.exec(data.content);
    let dep = undefined;
    while( line !== null ){
        dep = new RegExp(extractRegex).exec(line[0]);   // new keyword mandatory, or it will persist the prior RegEx state and bug out.
        let _fp = path.join( _cwd, dep[1]);
        if( fs.existsSync(_fp) === true){
            data.deps.push(_fp);
            data.content = data.content.replace(dep.input, "");
        };
        line = lineRegex.exec(_content);
    };

    data.content = clearExport(data.content);
    return data;
};

const clearExport = ( _content = "" ) => {
    let newcontent = _content;

    let rgx = /module.exports( )=( )([\s\S.]*?)[};]/g;
    let lineRegex = new RegExp(rgx);
    let line = lineRegex.exec(newcontent);
    
    while( line !== null ){
        newcontent = _content.replace(lineRegex, "");
        line = lineRegex.exec(newcontent);
    };
    return newcontent;
};

const processCode = ( _content = "", _cwd = "" ) => {
    
    // Setup return object,
    let data = {
        content: stripComments(String(_content)),
        deps: []
    };

    // Describe syntax specifications,
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
        let digest = extractDependency(data.content, syntax.line, syntax.extract, _cwd);
        data.deps.push(...digest.deps);
        data.content = digest.content;
    });

    // Return processed code & dependencies.
    return data;
};

const parseFile = ( _filepath, _graph = new NodeGraph() ) => {

    // Create a node & process code,
    let _node = _graph.addNode(_filepath,_filepath);
    let _data = processCode(fs.readFileSync(_filepath), path.join(_filepath, ".."));
    _node.setContent(_data.content);
    
    // For each dependency, try processing it & linking to current node,    
    for( let i = 0; i < _data.deps.length; i++){
        if(_graph.nodes[_data.deps[i]] !== undefined ){
            _node.addDependency(_graph.nodes[_data.deps[i]]);
        }
        else {
            _node.addDependency(parseFile(_data.deps[i], _graph));
        };
    };

    // Return this node.
    return _node;
};

const serializeGraph = ( _graph ) => {
    let _content = "";
    let _nodes = _graph.getNodeDependencySequence();

    for( let i = 0; i < _nodes.length; i++){
        _content += printBanner("Section");
        _content += cleanCode(_nodes[i].content);
    };
    return _content;
};

module.exports = {
    extractDependency,
    processCode,
    parseFile,
    serializeGraph,
};