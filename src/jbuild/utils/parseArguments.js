const parseEntryPoint = ( _filepath = "" ) => {
    return _filepath;
};

const parseBundleFile = ( _filepath = "" ) => {
    return _filepath;
};

const parseLanguage = ( _language = "JS" ) => {
    return _language;
};

const parseArguments = ( argv = [] ) => {

    let args = {
        entryPoint: undefined,
        bundleFile: undefined,
        language: undefined
    };

    args.entryPoint = parseEntryPoint(argv[2]);
    args.bundleFile = parseBundleFile(argv[3]);
    args.parseLanguage = parseLanguage();

    return args;
};

module.exports = parseArguments;