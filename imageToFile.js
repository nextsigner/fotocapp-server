cursor = db.capturas.find({}).sort({fechaRegistro:-1}).limit(1).pretty();
while(cursor.hasNext()){
    printjson(cursor.next());
}
