var http = require('http');
var fs = require('fs');

var access_token;
var instance_url = 'login.salesforce.com';
var response;
var api = '22.0';
var data;
	
var callBackFunction;

function redirectUser() {
	response.write(data);  
    response.end();
}



function execute(endpoint,method,reqData,token,_res){
	response = _res;
	data = '';
	
	console.log(':::: EXECUTE REQUEST ::::::');
	
	console.log(endpoint);
	console.log(method);
	console.log(reqData);
	console.log(token);
	
	if(method == 'GET') {
		endpoint += "?"+req;
	}
	
	var options = {
		host: instance_url,
		path: '/services/apexrest/'+endpoint,
		method: method,
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
		//	'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate'
		}
		
	}
	console.log(options.headers);
	var req = http.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	if(method != 'GET') {
		console.log(reqData);
		req.write(reqData);
	}
	req.end();			
	}

function query(soql,token,_res) {
	response = _res;
	data = '';
	var options = {
		host: instance_url,
		path: '/services/data/v'+api+'/query?q='+escape(soql),
		method: 'GET',
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate'
		}
		
	}
	console.log(options.headers);
	var req = http.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	
	req.end();
		
	}


function getObjectById(id,type,token,_res) {
	response = _res;
	data = '';
	var options = {
		host: instance_url,
		path: '/services/data/v'+api+'/sobjects/'+type+'/'+id,
		method: 'GET',
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate',
			'Content-type':'application/json; charset=UTF-8'
		}
		
	}
	console.log(options.headers);
	var req = https.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	req.write()
	req.end();
		
	}
	
function update(object,id,type,token,_res) {
	response = _res;
	data = '';
	var options = {
		host: instance_url,
		path: '/services/data/v'+api+'/sobjects/'+type+'/'+id,
		method: 'PATCH',
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate',
			'Content-type':'application/json; charset=UTF-8'
		}
		
	}
	console.log(options.headers);
	var req = http.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	req.write(object)
	req.end();
		
	}

function create(object,type,token,_res) {
	response = _res;
	data = '';
	var options = {
		host: instance_url,
		path: '/services/data/v'+api+'/sobjects/'+type,
		method: 'POST',
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate',
			'Content-type':'application/json; charset=UTF-8'
		}
		
	}
	console.log(options.headers);
	var req = http.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	req.write(object)
	req.end();
		
	}
	
function deleteObject(id,type,token,_res) {
	response = _res;
	data = '';
	var options = {
		host: 'na8.salesforce.com',
		path: '/services/data/v'+api+'/sobjects/'+type+'/'+id,
		method: 'DELETE',
		headers: {
			'Host': instance_url,
			'Authorization': 'OAuth '+token,
			'Accept':'application/jsonrequest',
			'Cache-Control':'no-cache,no-store,must-revalidate',
			'Content-type':'application/json; charset=UTF-8'
		}
		
	}
	console.log(options.headers);
	var req = http.request(options, function(res) {
		  console.log("statusCode: ", res.statusCode);
		  console.log("headers: ", res.headers);
		
		  res.on('data', function(_data) {
		    console.log("DATA"+_data);
		    data += _data;
		 	});
		
		  res.on('end', function(d) {
		  	console.log("END"+data);
		  	redirectUser(res);
		  	});
		
		}).on('error', function(e) {
		  console.log(e);
		//  errorCallback(e);
		})
	req.end();
		
	}
	

module.exports = {
 access_token : access_token,
 instance_url : instance_url,
 getObjectById : getObjectById,
 query : query,
 update : update,
 create : create,
 deleteObject : deleteObject,
 execute: execute,
 response : response,
 };