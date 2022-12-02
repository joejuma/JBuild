
const printMany = ( value = "", count = 1 ) => {
	let _s = "";
	for( let i = 0; i < count; i++){
		_s += value;
	};
	return _s;
};

const printWrapped = ( value = "", lineLength = 80, linePrefix = "" ) => {
	let wrappedValue = "";
	for( let i = 0; i < value.length; i++){
		wrappedValue += value[i];
		if( i % lineLength === 0 ){
			wrappedValue += ("\n" + linePrefix);
		};
	};
	return wrappedValue;
};

const printBanner = ( title = "" ) => {

/* ==================== # Example # ======================================== */

    // Configuration,
	const lineLength = 80;
	const titlePercentage = 0.33;
	const syntax = {
		lineStart: "/*",
		preTitle: " # ",
		postTitle: " # ",
		lineEnd: "*/",
	};

    // Positional & Length calculations,
	const titlePosition = Math.ceil(lineLength * titlePercentage);
	const titleLength = syntax.preTitle.length + title.length + syntax.postTitle.length;
	const preTitleCount = titlePosition - syntax.lineStart.length; 
	const postTitleCount = lineLength - (titlePosition + titleLength + syntax.postTitle.length);

    // Getting ready to go...
	let _code = "";
	
	// Multi-Line Banner,
	if( postTitleCount < 0 ){
		_code += "\n" + syntax.lineStart + "\n";
		_code += printWrapped(title, lineLength, "    ");
		_code += "\n" + syntax.lineEnd + "\n";
		
		return _code;
	};

	// Single-Line Banner,
	_code += "\n";
    _code += syntax.lineStart;
	_code += printMany("=", preTitleCount);
	_code += syntax.preTitle;
	_code += title;
	_code += syntax.postTitle;
	_code += printMany("=",postTitleCount);
	_code += syntax.lineEnd;
	_code += "\n";

	return _code;
};


module.exports = {
	printMany,
	printWrapped,
	printBanner,
};
