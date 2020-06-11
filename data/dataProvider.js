var _ = require('lodash');

var configArgument = process.argv[process.argv.length - 1];
var parsedConfig = JSON.parse(configArgument);
var environment = parsedConfig['gplanEnv'];
var defaultData = require('./default.json');
var data = defaultData;
var fs = require('fs');
var jsonFile = require('jsonfile');

if (environment) {
	try {
		var environmentSpecificData = require('./' + environment + '.json');
		data = _.extend(defaultData, environmentSpecificData);
	}
	catch (e) {
		console.log('No environment data for ' + environment);
	}
}

var files = fs.readdirSync('data/testdata');

files.forEach(function (file) {

	var fileNameParts = file.split('.');
	if (fileNameParts.pop() === "json") {
		var testFileData = jsonFile.readFileSync('data/testdata/' + file);
		data[fileNameParts.pop()] = testFileData;
	}
});

module.exports = data;