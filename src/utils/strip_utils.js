const stripEmptyLines = ( _code = "" ) => {
    let regex = /^\s*[\r\n]/gm;
    return _code.replace(regex, "");
};

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

module.exports = {
    stripEmptyLines,
    stripLineComments,
    stripBlockComments,
    stripComments,
};