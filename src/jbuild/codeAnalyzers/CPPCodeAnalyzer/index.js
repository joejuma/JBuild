const { stripEmptyLines, stripHangingSemicolons } = require("../../utils");
const CodeAnalyzer = require("../CodeAnalyzer");

class CPPCodeAnalyzer extends CodeAnalyzer {

    /*
        =======================================================================
        # C++ Code Analyzer (class)
        -----------------------------------------------------------------------
        A code-analyzer which is used to analyze C++ code for building a 
        JBuild graph.
        =======================================================================
    */

    constructor(){
        super("C++");

        // Regexs,
        this.blockCommentRegex = /\/\*([\s\S]*?)\*\//g;
        this.lineCommentRegex = /\/\/(.*?)\n/g;
    };
    
    extractDependencies = ( _code ) => {
        
    };

    stripComments = ( _code ) => {
        let code = _code;
        code = code.replace( this.lineCommentRegex, "");
        code = code.replace( this.blockCommentRegex, "");
        return code;
    };

    preProcess = ( _code = "" ) => {
        let code = _code;
        code = stripComments(code);
        return code;
    };

    postProcess = ( _code = "" ) => {
        let code = _code;
        code = stripEmptyLines( code );
        code = stripHangingSemicolons( code );
        return code;
    };

    analyze = ( _code = "" ) => {
        let thing = undefined;
        let code = preProcess(_code);
        code = postProcess(code);
        return thing;
    };
};

module.exports = CPPCodeAnalyzer;