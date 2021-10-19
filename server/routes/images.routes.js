import { Router } from "express";
import AWS from 'aws-sdk'
import config from '../config'
import Image from '../models/images'
import uploadFile from '../middleware/multer'

const router = Router()

const spacesEndpoint = new AWS.Endpoint(config.Endpoint)

const s3 = new AWS.S3({
    endpoint:spacesEndpoint
})

router.post('/api/images/upload',uploadFile(), async (req, res)=>{
    //Recibiendo las imagenes
    const files  = req.files;
    const {title} = req.body 
    const {bathRooms} = req.body 
    const {halfBathrooms} = req.body 
    const {typeOperation} = req.body
    const {parking} = req.body
    const {longTerrain} = req.body
    const {frontTerrain} = req.body
    const {description} = req.body
    const {rooms} = req.body;
    const {mtsConst} = req.body;
    const {mtsTerr} = req.body 
    const {yearConstruction} = req.body
    const {floorNumber} = req.body 
    const {numberOfFloors} = req.body
    const {maintenance} = req.body
    const {internalKey} = req.body
    const {keyOfKey} = req.body 
    const {ubication} = req.body
    const urls = []
    const keys = []
    //Listando individualmente las imagenes 
   for(const file of files){
        //Crear una URL para cada imagen  
        urls.push(`https://${config.BucketName}.${config.Endpoint}/${file.originalname}`)
        keys.push(file.originalname)
        //Subiendo imagenes a la nube
       await s3.putObject ({
             ACL: 'public-read',
             Bucket: config.BucketName,
             Body: file.buffer,
             Key: file.originalname
         }).promise();
       
        }   
    try {
        //Agregando a la base de datos
        const image =  new Image({
            url: urls,
            key: keys, 
            title: title,
            rooms: rooms,
            mtsConst: mtsConst,
            mtsTerr: mtsTerr,
            description: description,
            ubication: ubication,
            parking: parking,
            bathRooms: bathRooms,
            halfBathrooms: halfBathrooms,
            typeOperation: typeOperation,
            status: 'Agregado exitosamente'
        })

        await image.save()
        console.log(image)      
        res.json("Agregdo correctamente") 
     } catch (error) {
         console.log(error)
         res.json(error)
     }
 
   

    
})



router.get('/api/images/', async (req, res)=>{
    const images = await Image.find();
    return res.json(images)
})

router.get('/api/images/:id', async (req, res)=>{
    const image = await Image.findById(req.params.id)
    return res.json(image)
})

router.delete('/api/images/:id', async (req, res)=>{
    console.log(req.params.id)
    var image = await Image.findById(req.params.id)
   let keys = image.key
 
    const deleteImage = await Image.findByIdAndDelete(req.params.id);
    
 

    res.json(deleteImage)
})


export default router