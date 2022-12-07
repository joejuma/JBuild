const { eraseByRegex } = require("../../utils");

class CodeAnalyzer {

    /*
        =======================================================================
        # Code Analyzer (class)
        -----------------------------------------------------------------------
        ## Description
        An object which analyzes and processes code for the construction of a
        stripped-down dependency graph.
        =======================================================================
    */

    constructor( _lang = "JS" ){
        this.language = _lang;
    };

    preProcess = ( _code ) => {
        console.error("[ERROR] CodeAnalyzer.preProcess method was called, rather than a derived class method.");
    };

    postProcess = ( _code ) => {
        console.error("[ERROR] CodeAnalyzer.postProcess method was called, rather than a derived class method.");
    };

    analyze = ( _code = "" ) => {
        console.error("[ERROR] CodeAnalyzer.analyze method was called, rather than a derived class method!");
        return undefined;
    };
};

module.exports = CodeAnalyzer;