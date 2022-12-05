const { printMany, printWrapped, printBanner } = require("./print_utils.js");
const { stripEmptyLines, stripComments, stripHangingSemicolons } = require("./strip_utils.js");

module.exports = {
	printMany,
	printWrapped,
	printBanner,
	stripEmptyLines,
	stripComments,
	stripHangingSemicolons,
};