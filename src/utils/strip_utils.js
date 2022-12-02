const stripEmptyLines = ( _code ="" ) => {

    let rgx = /^\s*[\r\n]/gm;
    return _code.replace(rgx, "");
};

module.exports = {
    stripEmptyLines,
};