const { printMany, printWrapped, printBanner } = require("./print_utils.js");
const { cleanCode, stripComments } = require("./strip_utils.js");
const parseArguments = require("./parseArguments.js");

module.exports = {
	printMany,
	printWrapped,
	printBanner,
	stripComments,
	cleanCode,
	parseArguments
};