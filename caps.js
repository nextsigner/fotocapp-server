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
    app.post('/fotocapp/nuevacaptura', nuevaCaptura);
}

