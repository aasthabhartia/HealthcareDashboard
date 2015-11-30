var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
var ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var healthcare = require('./routes/healthcare');


app.get('/', function(req, res){
	 res.render('Login');
});


/**Login **/
app.post('/login', healthcare.loginUser);
app.get('/Login',healthcare.login);
app.get('/Register',healthcare.register);
app.get('/api/patients', healthcare.getpatients);
app.get('/api/patient/getCircleOfCare',healthcare.getCircleOfCareContacts);
app.get('/api/getPastNotifications',healthcare.getPastNotifications);
app.get('/PulseGraph',healthcare.pulseGraph);
app.get('/PulseGraph2',healthcare.pulseGraph2);
app.get('/ActivityGraph',healthcare.activityGraph);
app.get('/ActivityGraph2',healthcare.activityGraph2);
app.get('/SleepGraph',healthcare.sleepGraph);
app.get('/api/pulserate/getData', healthcare.getpatientPulserateData);
app.get('/api/activity/getData', healthcare.getpatientActivityData);
app.get('/api/sleep/getData', healthcare.getpatientSleepData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
