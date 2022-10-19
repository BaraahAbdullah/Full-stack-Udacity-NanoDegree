import path from 'path'
import sharp from 'sharp'
import fs from 'fs'

const currentDirectory: string = __dirname

const imagesDirectory: string = path.join(currentDirectory, '..', '..', 'images')

const thumbsDirectory: string = path.join(currentDirectory, '..', '..', 'imagesResized')

const makeDirectory = (): void => {
    fs.mkdir(thumbsDirectory, (err) => {
    console.log(`Error:${err}`)
    })
}

const checkDir = (): void => {
    if (fs.existsSync(thumbsDirectory)) return
    else {
    makeDirectory()
    return
    }
}

const checkImage = (image: string, height: number, width: number): boolean => {
    const imageResized: string = path.join(thumbsDirectory, `${image}_${height}_${width}.jpg`)

    return fs.existsSync(imageResized)
}

const imageProcessingApi = async (image: string, height: number, width: number): Promise<void> => {
    const imageResized: string = path.join(thumbsDirectory, `${image}_${height}_${width}.jpg`)
    const nonResizedImage: string = path.join(imagesDirectory, `${image}.jpg`)

    await sharp(nonResizedImage).resize({ height: height, width: width }).toFile(imageResized)
}

const imagesProcessing = async (image: string, height: number, width: number): Promise<boolean> => {
    try {
    checkDir()

    let status = false

    if (checkImage(image, height, width)) {
        status = true
    } else {
        await imageProcessingApi(image, height, width)
        status = true
    }

    return status
    } catch (err) {
    console.log(`Error:${err}`)
    return false
    }
}

export default imagesProcessing
