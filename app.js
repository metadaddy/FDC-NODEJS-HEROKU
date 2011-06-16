var fs = require('fs');
var url = require('url');
var server;

var http = require('http');
var httpServer;

var oauth = require('./oauth');
var rest = require('./rest');

//oauth.setKeys('3MVG9lKcPoNINVBJ9Kz1a5dKMW.uUZ0wD5Lx_DLSHY9ynsB5w1RwfOjItSZuYCgbB0%2EXtU4cwbXpeMOGvI%2EIt','5722795279005913741');
oauth.setKeys('3MVG9zeKbAVObYjPJixRj0EVnsIqnE1L8Zx7s2siPLbhdLlb892mzb6U0TifZaChqzghmrf00RUX3M8VSLIT7','6924647006748897156');
oauth.setCallback('https://smooth-dawn-328.herokuapp.com/token','views/filter.html');
//oauth.setHost('https://prerellogin.pre.salesforce.com/services/oauth2/authorize','prerellogin.pre.salesforce.com');

var port = process.env.PORT || 3000;


//fallback?
server = http.createServer(function(req, res) {
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
  /*	if(1 == 2) { //todo (obviously) correct cookie checking here
  		oauth.setOAuth(cookies.access_token);
  		fs.readFile('views/test.html', function(err, data){
    	res.writeHead(200, {'Content-Type':'text/html'});  
    	res.write(data);  
    	res.end();
  		});
  	} else { */
  		console.log(oauth.getLoginUrl());
  		res.writeHead(301, {'Location' : oauth.getLoginUrl()});
  		res.end();
  //	}
  }
  else if(req.url.indexOf('/token') >= 0) {
  	oauth.getRequestToken(req.url,res);
  
  } else if(req.url.indexOf('/get') >= 0) {
   	
  	rest.getObjectById(query.id,query.type,oauth.getOAuth().access_token,res);	
  		
  } else if(req.url.indexOf('/query') >= 0) {
   	
  	rest.query(query.q,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/update') >= 0) {
   	
   	console.log(query);
   	rest.update(query.o,query.id,query.type,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/create') >= 0) {
   	
  	rest.create(query.o,query.type,oauth.getOAuth().access_token,res);
  
  } else if(req.url.indexOf('/delete') >= 0) {
   	
  	rest.deleteObject(query.id,query.type,oauth.getOAuth().access_token,res);
  
  
  } else if(req.url.indexOf('/execute/') >= 0) {
   	
   	restData = req.url.split('/execute/')[1];
   	restData = restData.split('/');
   	
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
  		
  });
  
server.listen(port);
console.log('SSL Listening on '+port);

 