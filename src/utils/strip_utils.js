/* Comment Stripping */
const stripBlockComments = ( _code = "" ) => {
    let regex = /\/\*([\s\S]*?)\*\//g;
    return _code.replace(regex, "");
};

const stripLineComments = ( _code = "" ) => {
    let regex = /\/\/(.*?)\n/g;
    return _code.replace(regex, "");
};

const stripComments = ( _code = "" ) => {
    return stripLineComments(stripBlockComments( _code ));
};

/* Generic Stripping */
const stripEmptyLines = ( _code = "" ) => {
    let regex = /^\s*[\r\n]/gm;
    return _code.replace(regex, "");
};

const stripHangingSemicolons = ( _code = "" ) => {
    let regex = /^;(\s)?/gm;
    return _code.replace(regex, "");
};

const cleanCode = ( _code = "" ) => {
    return stripHangingSemicolons(stripEmptyLines(_code));
};

module.exports = {
    cleanCode,
    stripLineComments,
    stripBlockComments,
    stripComments,
};