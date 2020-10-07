var appServerName='fotocapp-server'
var args = process.argv.slice(2);
var puertoApp = '8080'; //Puerto que recibe acciones
var puertoStatico = '8081'; //Puerto para descargar archivos
var folderFiles = 'files/';
var serverEmail=process.env.EMAIL
var serverEmailPass=process.env.EMAILPASS
var serverEmailService=process.env.EMAILSERVICE

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(puertoStatico);

var fs = require('fs');
var path = require('path');

console.log('Nota: Comando forever a utilizar "forever start /root/ppres/index.js"')

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
app.set('port', process.env.PORT || puertoApp);

// enable files upload
app.use(fileUpload({
                       createParentPath: true
                   }));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app
const port = process.env.PORT || 8080;


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
//    app.listen(port, () =>
//               console.log(`App is listening on port ${port}.`)
//               );
    app.listen(app.get('port'), function() {
        console.log('Servidor '+appServerName+' iniciado.');
        console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
    });
})
app.post('/fotocapp-receiver', async (req, res) => {
             try {
                 if(!req.files) {
                     res.send({
                                  status: false,
                                  message: 'No file uploaded'
                              });
                 } else {
                     //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                     let avatar = req.files.avatar;

                     //Use the mv() method to place the file in upload directory (i.e. "uploads")
                     avatar.mv('./uploads/' + avatar.name);

                     //send response
                     res.send({
                                  status: true,
                                  message: 'File is uploaded',
                                  data: {
                                      name: avatar.name,
                                      mimetype: avatar.mimetype,
                                      size: avatar.size
                                  }
                              });
                 }
             } catch (err) {
                 res.status(500).send(err);
             }
         });
