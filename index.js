var appServerName='fotocapp'
var args = process.argv.slice(2);
var puertoApp = '8083'; //Puerto que recibe acciones
var puertoStatico = '8084'; //Puerto para descargar archivos
var folderFiles = 'files/';
var serverEmail=process.env.EMAIL
var serverEmailPass=process.env.EMAILPASS
var serverEmailService=process.env.EMAILSERVICE

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(puertoStatico);

var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname));
app.set('port', process.env.PORT || puertoApp);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

require('./caps.js')(app);

//app.listen(app.get('port'), function() {
//    console.log('Servidor ppres iniciado.');
//    console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
//});
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db conectada!');
    // we're connected!
});
let urlMongoDatabase='mongodb://127.0.0.1:27017/'+appServerName
mongoose.connect(urlMongoDatabase, { useNewUrlParser: true }, function (err, res){
    if(err){
        return console.log(`Error al conectar a ${urlMongoDatabase} ${err}`)
    }
    console.log(`Conectado a ${urlMongoDatabase}`)
    app.listen(app.get('port'), function() {
        console.log('Servidor '+appServerName+' iniciado.');
        console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
    });
})

console.log('Nota: Comando forever a utilizar "forever start /root/fotocapp-server/index.js"')

