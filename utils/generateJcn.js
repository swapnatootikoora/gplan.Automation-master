var request = require('request');
var Q = require('q');

function generateJcn(proxy) {

	var deferred = Q.defer();

	request.post(
    'http://globaljet.jicrit.co.uk/campaignmanager/campaign/create/',
    {
		headers: {
			'Content-Length': 206,
			'Cookie': '_ga=GA1.3.752016940.1441368933; JETSESSIDGLOBAL=6mdiq3mh585n92j327brh3t993',
			'Accept': 'text/html, application/xhtml+xml, */*',
			'Referer': 'http://globaljet.jicrit.co.uk/campaignmanager/campaign/create/',
			'Accept-Language': 'en-GB',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Connection': 'Keep-Alive',
			'DNT': 1,
			'Host': 'globaljet.jicrit.co.uk',
			'Pragma': 'no-cache'
		},
		'proxy': proxy,
		body: 'client_brand=&campaign_name=ST01%20397%20AT&campaign_start_date=16%2F09%2F2015&campaign_end_date=30%2F12%2F2015&non_jet_agency=173&purchase_order%5B%5D=&campaign_type%5B%5D=1&submit_campaign=Create+Campaign'
	},
    function (error, response, body) {
		if (!error && response.statusCode == 302) {
		    var url = response.headers.location;
			var indexOfJcn = url.indexOf('jcn/');
			var indexOfMode = url.indexOf('/mode');
			var jcn = url.substr(indexOfJcn+4, indexOfMode - (indexOfJcn+4));
			deferred.resolve(jcn);
	  	} else {
	  		console.log("Error generating JCN - " + response.statusCode);
	  		deferred.reject('Error generating JCN');
	  	}
    });

    return deferred.promise;
}

module.exports = generateJcn;