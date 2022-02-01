import mongoose from 'mongoose'

(async()=>{
 const db = await  mongoose.connect('mongodb://147.182.218.131/inmobiliaria', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
console.log('connect to:', db.connection.name)
}) ();



