var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = 'localhost';
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

exports.register = function(req, res) {
	
	res.render('Register');

};

exports.login = function(req, res) {
	
	res.render('Login');

};

exports.pulseGraph = function(req, res) {
	
	var userId = new ObjectID(req.query.userId);
	res.render('PulseGraph',{userid:userId});

};
exports.pulseGraph2 = function(req, res) {
	
	res.render('PulseGraph2');

};
exports.activityGraph = function(req, res) {
	
	var userId = new ObjectID(req.query.userId);
	res.render('ActivityGraph',{userid:userId});

};
exports.activityGraph2 = function(req, res) {
	
	res.render('ActivityGraph2');

};
exports.sleepGraph = function(req, res) {
	
	var userId = new ObjectID(req.query.userId);
	res.render('SleepGraph',{userid:userId});

};

exports.sleepEfficiencyGraph = function(req, res) {
	
	var userId = new ObjectID(req.query.userId);
	res.render('SleepEfficiencyGraph',{userid:userId});

};
exports.decisionTree = function(req, res) {
	
	var hasHeartDisease = req.query.hasHeartDisease;
	var userId = new ObjectID(req.query.userId);
	res.render('DecisionTree',{hasHeartdisease:hasHeartDisease , userid:userId });

};

exports.getpatientPulserateData = function(req, res)
{
	
	var userId = new ObjectID(req.query.userId);
	var request = require('request');
	
	request({
	    //url: 'http://localhost:8080/api/pulserate/' + userId + '/days/30', //URL to hit
	    url : 'http://localhost:8080/api/patient/' + userId + '/pulserate',
		method: 'GET'	    
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);	       
	    } 
	    else {
	    	var r = JSON.parse(body);
	        console.info('\n\nCall completed');
	        res.send({result:r});
	}
	});

};

exports.getDecisionTree = function(req, res)
{
	
	var userId = new ObjectID(req.query.userId);
	var request = require('request');
	
	request({
	    //url: 'http://localhost:8080/api/pulserate/' + userId + '/days/30', //URL to hit
	    url : 'http://localhost:8080/api/heartcondition/' + userId + '/feedbackloop',
		method: 'GET'	    
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);	       
	    } 
	    else {
	    	
	        console.info('\n\nCall completed');
	        res.send({result:body});
	}
	});

};

exports.getpatientActivityData = function(req, res)
{
	
	var userId = new ObjectID(req.query.userId);
	var request = require('request');
	
	request({
	    //url: 'http://localhost:8080/api/pulserate/' + userId + '/days/30', //URL to hit
	    url : 'http://localhost:8080/api/patient/' + userId + '/activitydatarange/300',
		method: 'GET'	    
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);	       
	    } 
	    else {
	    	console.info(body);
	    	var r = JSON.parse(body);
	        console.info('\n\nCall completed');
	        res.send({result:r});
	}
	});

};


exports.getpatientSleepData = function(req, res)
{
	
	var userId = new ObjectID(req.query.userId);
	var request = require('request');
	
	request({
	    //url: 'http://localhost:8080/api/pulserate/' + userId + '/days/30', //URL to hit
	    url : 'http://localhost:8080/api/patient/' + userId + '/sleep',
		method: 'GET'	    
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);	       
	    } 
	    else {
	    	console.info(body);
	    	var r = JSON.parse(body);
	        console.info('\n\nCall completed');
	        res.send({result:r});
	}
	});

};


exports.loginUser = function(req, res) 
{
	/*var requestData = {};
	  //      "username": req.body.email,
	  //      "password" : req.body.password
	  //  }
	var http = require('http');
	var optionspost = {
	    host : url, // here only the domain name
	    // (no http/https !)
	    port : 8080,
	    path : '/api/patient/login' , // the rest of the url with parameters if needed
	    method : 'POST', // do POST
	    contentType: "application/json",
	    body: JSON.stringify(requestData)
	};

	console.info('Options prepared:');
	console.info(optionspost);
	console.info('Do the POST call');

	// do the POST request
	var reqPost = http.request(optionspost, function(response) {
	    
		console.log("statusCode: ", response.statusCode);
		response.on('data', function(d) {
	        
			console.info('GET result:\n');
	        var r = JSON.parse(d);
	        console.info(r);
	        console.info('\n\nCall completed');
	        res.render('Healthcare',{userid:r});
	    });

	});

	reqPost.end();
	reqPost.on('error', function(e) {
	    console.error(e);
	});
	*/
	//Load the request module
	var request = require('request');

	//Lets configure and request
	request({
	    url: 'http://localhost:8080/api/patient/login', //URL to hit
	    method: 'POST',
	    //Lets post the following key/values as form
	    json: {
	    	username: req.body.email,
	        password: req.body.password
	    }
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);
	        res.render('Login');
	    } else if(body.toString() === 'Invalid username' || body.toString() === 'Invalid password' ) {
	    	res.render('Login');
	    }
	    else {
	        console.log(response.statusCode, body);
	        res.render('Healthcare',{userid:body});
	}
	});
	
	
} ;

exports.getpatients = function(req, res)
{
	var userId = new ObjectID(req.query.userId);
	var http = require('http');
	var optionsget = {
		    host : url, // here only the domain name
		    // (no http/https !)
		    port : 8080,
		    path : '/api/patients/' + userId, // the rest of the url with parameters if needed
		    method : 'GET' // do GET
		};

		console.info('Options prepared:');
		console.info(optionsget);
		console.info('Do the GET call');

		// do the GET request
		var reqGet = http.request(optionsget, function(response) {
		    
			console.log("statusCode: ", response.statusCode);
			response.on('data', function(d) {
		        
				console.info('GET result:\n');
		        var r = JSON.parse(d);
		        console.info(r);
		        console.info('\n\nCall completed');
		        res.send({result:r});
		    });

		});

		reqGet.end();
		reqGet.on('error', function(e) {
		    console.error(e);
		});

};

exports.getCircleOfCareContacts = function(req, res)
{
	var userId = new ObjectID(req.query.userId);
	var http = require('http');
	var optionsget = {
		    host : url, // here only the domain name
		    // (no http/https !)
		    port : 8080,
		    path : '/api/patient/' + userId + '/circleofcarecontacts', // the rest of the url with parameters if needed
		    method : 'GET' // do GET
		};

		console.info('Options prepared:');
		console.info(optionsget);
		console.info('Do the GET call');

		// do the GET request
		var reqGet = http.request(optionsget, function(response) {
		    
			console.log("statusCode: ", response.statusCode);
			response.on('data', function(d) {
		        
				console.info('GET result:\n');
		        var r = JSON.parse(d);
		        console.info(r);
		        console.info('\n\nCall completed');
		        res.send({result:r});
		    });

		});

		reqGet.end();
		reqGet.on('error', function(e) {
		    console.error(e);
		});

};


exports.getPastNotifications = function(req, res)
{
	
	var userId = new ObjectID(req.query.userId);
	var request = require('request');
	
	request({
	    url: 'http://localhost:8080/api/patient/' + userId + '/notifications', //URL to hit
	    method: 'GET'	    
	}, function(error, response, body){
	    if(error) {	    	
	        console.log(error);	       
	    } 
	    else {
	    	var r = JSON.parse(body);
	        console.info('\n\nCall completed');
	        res.send({result:r});
	}
	});

};


