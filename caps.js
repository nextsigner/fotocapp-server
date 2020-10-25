module.exports=function(app){

    const Captura = require('./models/Captura')
    nuevaCaptura = function(req, res){
        let d = new Date(Date.now())
        let captura = new Captura()
        let json=JSON.parse(req.body.ctx)
        captura.administrador=json.ctx.administrador
        captura.fotografo=json.ctx.fotografo
        captura.fotode=json.ctx.fotode
        captura.fechaRegistro=d
        console.log('Insertando nueva captura... \nAdministrador: '+json.ctx.administrador+' \nFotografo: '+json.ctx.fotografo+'Foto de: \n'+json.ctx.fotode)
        captura.imagen=req.body.imagen

        //console.log('Creando un nuevo presupuesto de técnico: '+presupuesto.tecnico+' Productos: \n'+presupuesto.productos)
        captura.save(function(err, capRegistered){
            if(err){
                res.status(500).send(`Error al crear captura: ${err}`)
                return
            }
            res.status(200).send({captura: capRegistered}) })
    };
    getAsistencias = function(req, res){
        console.log('Buscando capturas de administrador '+req.query.consulta)
        //var regExp= new RegExp(''+(''+req.query.consulta).toUpperCase()+'|'+(''+req.query.consulta).toLocaleLowerCase())
        //var regExp= new RegExp(''+(''+req.query.consulta).toUpperCase()+'|'+(''+req.query.consulta).toLocaleLowerCase())
        var regExp= new RegExp(req.query.consulta)
        Captura.find({
                          //date: {$gt: h }
                          //date: {$gte: "2019-06-12T00:00:00+01:00", $lte: "2019-12-12T23:00:00+01:00" }
                          //date: {$gte: h, $lte: hf }
                          administrador: regExp
                      },
                      ['administrador', 'fotografo', 'fotode', 'fechaRegistro'], // Columns to Return
                      {
                          skip:0, // Starting Row
                          //limit:1, // Ending Row
                          sort:{
                              fechaRegistro: 1 //Sort by Date Added DESC
                          }
                      },
                      function(err, resultados){
                          if(err) res.status(500).send({mensaje: `Error al buscar capturas: ${err}`})
                          if(resultados.length===0){
                              console.log('No se encontró ninguna captura '+req.query.consulta);
                              res.status(200).send({asistencias: false})
                          }else{
                              console.log('Se devolverán datos de capturas a la consulta: '+req.query.consulta);
                              res.status(200).send({asistencias: resultados})
                          }
                      })
    };
    getImagen = function(req, res){
        console.log('Buscando capturas con ide '+req.query.id)
        //var regExp= new RegExp(''+(''+req.query.consulta).toUpperCase()+'|'+(''+req.query.consulta).toLocaleLowerCase())
        Captura.findById(req.query.id,
                         ['imagen'],
                      function(err, resultados){
                          if(err) res.status(500).send({mensaje: `Error al buscar capturas: ${err}`})
                          if(resultados.length===0){
                              console.log('No se encontró ninguna captura '+req.query.id);
                              res.status(200).send({asistencias: false})
                          }else{
                              console.log('Se devolverán datos de capturas a la consulta: '+req.query.id);
                              //console.log('::::: '+resultados);
                              res.status(200).send({asistencias: resultados})
                          }
                      })
    };
    app.post('/fotocapp/nuevacaptura', nuevaCaptura);
    app.get('/fotocapp/getAsistencias', getAsistencias);
    app.get('/fotocapp/getImagen', getImagen);
}

