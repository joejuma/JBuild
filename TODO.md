# To Do
* Add a method for stripping line-commented and block-commented code out before deps are parsed.
* Add behavior for removing the `;` at the end of module.exports from the file if they exist.
* Do a refactor to clean up and re-architect the code so it's a bit more robust, and less hack.
* Update node.name to be the actual filename, rather than the full-path.
    * Then update it so the banner printing uses node.name, instead of "Section".