var fs = require('fs');
var url = require('url');
var server;

var http;
var httpServer;
var port = process.env.PORT || 3000;

var oauth = require('./oauth');
var rest = require('./rest');

//Recommend two Remote Access configurations, one for local and one for Heroku.  This will allow you to swap between the 
//two without changes.  Just test locally and then git to Heroku when ready to deploy (in theory)


if(typeof(process.env.PORT) == 'undefined') {  //you are probably not on Heroku, setup your own SSL
	// This info is out of date when referring to HTTPS, but the cert gen is the same: http://www.silassewell.com/blog/2010/06/03/node-js-https-ssl-server-example/
	
	oauth.setKeys('{LOCALPUBLICKEY}','{LOCALSECRETKEY}');
	oauth.setCallback('https://{LOCALDOMAIN}/token','views/{LOCALSTART}.html');

	
	http = require('https');
	var options = { //sample cert setup
  		key: fs.readFileSync('../privatekey.pem'),
  		cert: fs.readFileSync('../certificate.pem')
	};
	console.log('SSL Configured');
	
	server = http.createServer(options,RESTHandler);
} else {
	
	oauth.setKeys('{REMOTEPUBLICKEY}','{REMOTEPRIVATEKE}');
	oauth.setCallback('https://{HEROKUDOMAIN}/token','views/{REMOTESTART}.html');

	
	http = require('http');
	server = http.createServer(RESTHandler);
	console.log('HTTP Configured');
	
	
}


  
server.listen(port);
console.log('REST Listening on '+port);

//RESTful API router
function RESTHandler (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
  });
  
  console.log("Request::::"+req.url);
  console.log("Cookies::::"+cookies.access_token);
  console.log("Cookies::::"+cookies.refresh_token);
  
  
  if(req.url == '/') {
	fs.readFile('views/index.html', function(err, data){
    	res.writeHead(200, {'Content-Type':'text/html'});  
    	res.write(data);  
    	res.end();
  		});
  }
  //RESTful API
  
  else if(req.url == '/login') {
  	if(cookies.access_token != null) { 
  		oauth.setOAuth(cookies.access_token);
  		fs.readFile(oauth.getCallbackFile(), function(err, data){
    	res.writeHead(200, {'Content-Type':'text/html'});  
    	res.write(data);  
    	res.end();
  		});
  	} else { 
  	 
  	    console.log('Logging In with OAuth');
  		console.log(oauth.getLoginUrl());
  		res.writeHead(301, {'Location' : oauth.getLoginUrl(), 'Cache-Control':'no-cache,no-store,must-revalidate'});
  		res.end();
  	}
  }
  else if(req.url.indexOf('/token') >= 0) {
  	oauth.getRequestToken(req.url,res);
  
  } else if(req.url.indexOf('/get') >= 0) {
   	
   	console.log("Getting :: "+query.id);
  	rest.getObjectById(query.id,query.type,oauth.getOAuth().access_token,res);	
  		
  } else if(req.url.indexOf('/query') >= 0) {
   	
  	console.log("Query :: "+query.q);
  	rest.query(query.q,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/update') >= 0) {
   	
   	console.log("Updating :: "+query.id);
  	rest.update(query.o,query.id,query.type,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/create') >= 0) {
   	
   	console.log("Creating :: "+query.type);
  	rest.create(query.o,query.type,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/delete') >= 0) {
   	
   	console.log("Deleting :: "+query.id);
  	rest.deleteObject(query.id,query.type,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/execute/') >= 0) {
   	
   	restData = req.url.split('/execute/')[1];
   	restData = restData.split('/');
   	console.log("Custom Apex Execute :: "+restData[0]+"."+restData[1]);
   	
  	rest.execute(restData[0],restData[1],unescape(restData[2]),oauth.getOAuth().access_token,res);
  
  } else {
  		
  		fs.readFile('views'+req.url, function(err, data){
    		if(data) {
    		console.log(data);
    		res.writeHead(200, {'Content-Type':'text/html'});  
    		res.write(data);  
    		res.end();
    		}
  		});
  }
  		
  }

 