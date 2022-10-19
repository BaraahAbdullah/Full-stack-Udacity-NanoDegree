import express, { Router, Request, Response } from 'express'
import path from 'path'
import resize from './api/imagesProcessingRouter'

const router: Router = express.Router()

router.use('/images', express.static(path.join(__dirname, '..', '..', 'images')))

router.get('/', (request: Request, response: Response): void => {
    response.status(200).json({ Message: 'Welcome in Baraah system to Resize Images ' })
    response.end()
});

router.use('/api/resize', resize)

router.all('/*', (request: Request, response: Response): void => {
    response.status(404).json({ Message: `Error 404 Not Found  ->${request.url} ` })
    response.end()
});

export default router;
