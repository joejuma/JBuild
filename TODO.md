# To Do

## Version 1.0.0
* Add `pkg` dependency.
* Add a build script for building into an executable.
* Rearrange the project structure to clean it up, and set it up for building.

## Version 1.5.0
* Add actual language parameter support and parsing.
* Implement C++ language support by implementing CPPCodeAnalyzer.
* Look into making a CommentParser object that can then be added to a CodeAnalyzer. This would then handle comment parsing. This way, languages which share comment styles share code for comment parsing and you can begin to build CodeAnalyzers by mixing and matching parts.

## Version 2.0.0
* Refactor so that a directory parser object is used to allow for alternative include syntaxes which do not use filepath but instead symbolic packaging such as Python, Java and Kotlin.