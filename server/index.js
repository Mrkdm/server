import express from 'express'

import cors from 'cors'

import indexRoutes from './routes/index.routes'
import imagesRoutes from './routes/images.routes'
import './database'

const app = express();



app.use(cors())

app.use(indexRoutes)
app.use(imagesRoutes)   


app.set('port', process.env.PORT || 4000);
console.log('success')


app.listen(app.get('port'))