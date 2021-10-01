import {Schema, model} from 'mongoose'

const ImageSchema =new Schema({
    description: String,
    rooms: String,
    key: Array,
    status: String,
    url:{
        type: Array,
        required: true
    }

},{
    timestamps:true,
    versionKey:false
})


export default model('Image', ImageSchema)