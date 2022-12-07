const { stripEmptyLines, stripHangingSemicolons } = require("../../utils");
const CodeAnalyzer = require("../CodeAnalyzer");
const fs = require("fs");
const path = require("path");

class JSCodeAnalyzer extends CodeAnalyzer {

    /*
        =======================================================================
        # JavaScript Code Analyzer (class)
        -----------------------------------------------------------------------
        A code-analyzer which is used to analyze JavaScript code for building
        a JBuild graph. Employs the `analyze` function to analyze a single
        block of code and returns a cleaned up version of the code along with
        an array of dependency filepaths.
        =======================================================================
    */

    constructor(){
        super("JS");

        // Regexs,
        this.blockCommentRegex = /\/\*([\s\S]*?)\*\//g;
        this.lineCommentRegex = /\/\/(.*?)\n/g;
        this.dependencyRegexs = [
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
    };

    stripComments = ( _code = "" ) => {
        let code = _code;
        code = code.replace( this.lineCommentRegex, "");
        code = code.replace( this.blockCommentRegex, "");
        return code;
    };

    eraseExports = ( _code ) => {

        let code = _code;
        let exportRegex = /module.exports( )=( )([\s\S.]*?)[};]/g;
        let rgx = new RegExp(exportRegex);
        let line = rgx.exec(code);

        while( line !== null ){
            code = code.replace(rgx, "");
            line = rgx.exec(code);
        };

        return code;
    };

    extractDependencies = ( _code = "", cwd = "." ) => {
        
        //@bug: there's a bug in here that's causing improper extraction of dependencies.

        let code = _code;
        let dependencies = [];

        // For each type of dependency syntax process the code,
        this.dependencyRegexs.map((rgx) => {

            let deps = [];
            let dependency = undefined;
            let line = new RegExp(rgx.line).exec(code);
            
            // Keep on parsing those regex lines...
            while( line !== null ){
            
                dependency = new RegExp(rgx.extract).exec(line[0]);
                let filePath = path.join(cwd, dependency[1]);
                // If the filepath is valid, add it to dependencies & extract that dependency from the code,
                if(fs.existsSync(filePath)){
                    deps.push(filePath);
                    code = code.replace(dependency.input,""); // 'input' is something regex exec creates.
                };
                line = new RegExp(rgx.line).exec(code); // If you don't do this, it continues from prior Regex position; misses strings because code has been changed.
            };

            dependencies.push(...deps);
        });

        // Return object with newly cleaned code and dependencies list,
        return {
            code: code,
            dependencies: dependencies
        };
    };

    preProcess = ( _code = "" ) => {
        
        let code = _code;
        code = this.stripComments(code);
        
        return code;
    };

    postProcess = ( _code = "" ) => {

        let code = _code;
        
        code = this.eraseExports(code);
        code = stripEmptyLines( code );
        code = stripHangingSemicolons( code );
        
        return code;
    };

    analyze = ( _code = "", cwd = "." ) => {

        let code = this.preProcess(_code);
        let data = this.extractDependencies(code, cwd);
        code = data.code;
        code = this.postProcess(code);

        return {
            code: code,
            dependencies: data.dependencies
        };
    };
};

module.exports = JSCodeAnalyzer;