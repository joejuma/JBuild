# To Do
* Add a method for stripping line-commented and block-commented code out before deps are parsed.
* Figure out why there's an empty extra node being added.
* Add logic for rooting out if a file exists or not, and leaving in deps that are of files that don't exist.
    * This is really just about _not stripping_ dependencies that are absolute honestly.
