import express, { Application } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import router from './routes/router'
dotenv.config()

const PORT = process.env.PORT || 3000
const app: Application = express()

app.use(morgan('short'))
app.use(router)

app.listen(PORT, () => {
    console.log(` server started at localhost : ${PORT}`)
})

export default app
