# To Do
* Do a refactor to clean up and re-architect the code so it's a bit more robust, and less hack.
* Update node.name to be the actual filename, rather than the full-path.
    * Then update it so the banner printing uses node.name, instead of "Section".

### Refactor
* Flesh out new parsing logic inside the GraphBuilder class.
* Update the parsing logic so that node.name and node.filepath are not the same.
* Create a code-cleaning function which has an array of the Regex and calls them using map to clean code both in pre and post processing.
* Clean up the regex shenanigans if possible (Might be a Refactor #2).
* Add multi-language support - aka just Regex swapping - for C++ during refactor.