// ./handles.js
// Necessary imports
const url = require('url')
const qs = require('querystring')


module.exports = {
	serverHandle: function (req, res) {
	const route = url.parse(req.url)
	const path = route.pathname
	const params = qs.parse(route.query)

	res.writeHead(200, {'Content-Type': 'text/plain'});

	if (path === '/hello' && 'name' in params) {
		if(params['name']=='Artem')
			res.write('Hello, my name is ' + params['name']+ ' I am a student is ECE Paris');
		else
			res.write('Hello ' + params['name']);
	} 
	else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('Error 404');
	}

		res.end();

	}
	/*
	const AnotherFunction = function () {
		return true
	}
	*/
	/*
	module.exports = {
		serverHandle: serverHandle 
		//anotherFunction: anotherFunciton
	}*/
}
