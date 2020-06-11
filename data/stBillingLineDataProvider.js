var _ = require('lodash');

var configArgument = process.argv[process.argv.length - 1];
var parsedConfig = JSON.parse(configArgument);
var environment = parsedConfig['gplanEnv'];
var defaultData = require('./stBillingLineData.json');
var data = defaultData;

if (environment) {
	try {
		var environmentSpecificData = require('./' + environment + '.json');
		data = _.extend(defaultData, environmentSpecificData);
	}
	catch (e) {
		console.log('No environment data for ' + environment);
	}
}

module.exports = data;