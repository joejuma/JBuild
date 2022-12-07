const CodeAnalyzer = require("./CodeAnalyzer");
const JSCodeAnalyzer = require("./JSCodeAnalyzer");
const CPPCodeAnalyzer = require("./CPPCodeAnalyzer");

const createAnalyzer = ( _lang ) => {
    switch(_lang){
        case "JS":
            return new JSCodeAnalyzer();
            break;
        case "C++":
            return new CPPCodeAnalyzer();
            break;
        default:
            console.error(`[ERROR] createAnalyzer() called with invalid language ${_lang}!`);
            return undefined;
    }
};

module.exports = {
    createAnalyzer,
    CodeAnalyzer,
    JSCodeAnalyzer,
    CPPCodeAnalyzer,
};