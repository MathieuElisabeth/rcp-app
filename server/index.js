import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import recipeRoute from './routes/recipes.js'
import userRoute from './routes/user.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
dotenv.config()

app.use(cors());

//Connect to DB
try {
  await mongoose.connect(process.env.DB_CONNECT)
  console.log('connect to db!')
} catch (error) {
  console.log('error: ', error)
}

// Middleware
// app.use(express.json())

app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

// Routes Middlewares
app.use('/api/auth',  authRoute)
app.use('/api/user',  userRoute)
app.use('/api/recipe',  recipeRoute)

app.listen(8080, () => console.log('Server is running')) 