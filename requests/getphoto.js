const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

module.exports = async function (req, res) {
    const photoNumber = req.params.id
    const width_string = req.params.width || 1000
    const height_string = req.params.height || 600
    const width = parseInt(width_string)
    const height = parseInt(height_string)

    try {
        const photosList = await fs.readdir(__dirname + '/../photos/')
        console.log('Fetching Photo ' + path.resolve('./photos/' + photosList[photoNumber]))
        const resizedPhotoBuffer = await sharp(path.resolve('./photos/' + photosList[photoNumber]))
            .resize(width, height)
            .toBuffer()
        res.send(resizedPhotoBuffer)
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}