'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const capturaSchema = Schema({
                                 administrador: String,
                                 fotografo: String,
                                 fotode: String,
                                 imagen: String,
                                 fechaRegistro: Date
                             }, { versionKey: false })

var collectionName='Captura'
module.exports=mongoose.model(collectionName, capturaSchema)
