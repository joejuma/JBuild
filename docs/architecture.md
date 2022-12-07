# JBuild Architecture

* The program takes in arguments and calls jbuild.analyze with the passed in args.
* jbuild.analyze builds a fresh graph object, then a code-analyzer object specific to the specified language. It then builds the graph using the code-analyzer for most the processing.
* jbuild.analyze then serializes the graph and outputs it to the specified output file.

## Adding a New Language
1. Create a new CodeAnalyzer sub-class for your language, see JSCodeAnalyzer for reference - it analyzes JavaScript.
2. Add the key for the language into createAnalyzer() in codeAnalyzer/index.js and return your new analyzer type.
3. You should be all set!
