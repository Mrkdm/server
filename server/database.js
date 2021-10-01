import mongoose from 'mongoose'

(async()=>{
 const db = await  mongoose.connect('mongodb://68.183.16.45/inmobiliaria', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
console.log('connect to:', db.connection.name)
}) ();



