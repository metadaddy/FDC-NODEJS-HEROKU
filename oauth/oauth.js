var http = require('http');
var https = require('https');
var fs = require('fs');
var res;

var publicKey = '3MVG9zeKbAVObYjPJixRj0EVnsIqnE1L8Zx7s2siPLbhdLlb892mzb6U0TifZaChqzghmrf00RUX3M8VSLIT7';
var privateKey = '6924647006748897156';
var callbackURI = 'https://smooth-dawn-328.herokuapp.com/token';
var oauthURL = 'https://login.salesforce.com/services/oauth2/authorize?display=touch&response_type=code&client_id='+publicKey+'&redirect_uri='+callbackURI;
var requestToken;
var oauthResponse = '';

function getToken() { return requestToken; }
function getOAuth() { return oauthResponse; }

function setOAuth(oauth) {
	oauthResponse = {access_token: oauth};
}

function getRequestToken(url,_res) {
	res = _res;
	var tokenURL = unescape(url);
	requestToken = escape(tokenURL.substring(tokenURL.indexOf("code=")+5,tokenURL.length));
	console.log('Request Token:::'+requestToken);
	getAccessToken(requestToken);
}

function redirectUser() {
	console.log('RESPONSE:::'+oauthResponse);
	fs.readFile('views/test.html', function(err, data){
    	res.setHeader('Set-Cookie', ['refresh_token='+oauthResponse.refresh_token,'access_token='+oauthResponse.access_token]); 
    	res.write(data);  
    	res.end();
  		});
}	


function getAccessToken(token) {
	console.log('Getting Access Token for '+token);
	
	var post_data = 'code='+token+'&grant_type=authorization_code&client_id='+publicKey+'&redirect_uri='+escape(callbackURI)+'&client_secret='+privateKey;
	console.log(post_data);
	console.log();
	console.log(publicKey);
	console.log(privateKey);
	
	var options = {
		host: 'login.salesforce.com',
		path: '/services/oauth2/token',
		method: 'POST',
		headers: {
			'host': 'login.salesforce.com',
			'Content-Length': post_data.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate'
		}
	}
	
	var req = https.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(data) {
		    oauthResponse = JSON.parse(data);
		 	});
		
		  res.on('end', function(d) {
		  	redirectUser();
		  	});
		
		}).on('error', function(e) {
		  console.error(e);
		})
	
	req.write(post_data);
	req.end();
		
	}


module.exports = {
 oauthURL : oauthURL,
 getRequestToken : getRequestToken,
 getToken: getToken,
 getOAuth: getOAuth,
 setOAuth: setOAuth,
 getAccessToken: getAccessToken
 };