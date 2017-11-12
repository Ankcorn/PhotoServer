const path = require('path')
const fs = require('fs-extra')
const exifdb = require('./exifdata')

async function scanDir(dir) {
    const fileList = await fs.readdir(dir)
    return parsedPhotoList = fileList.filter(removeDS)
}

async function findNewPhotos(photo_dir) {
    try{
    console.log(`Searching in ${photo_dir}`)
    const photos_in_dir = await scanDir(photo_dir) 
    const exif_db = await exifdb.listAllRecords()
    const not_exif_db = photos_in_dir.filter(x => exif_db.indexOf(x) === -1)
    const docs = await Promise.all(not_exif_db.map(photo =>exifdb.writeExifData(photo)))
    if (docs.length === not_exif_db.length) {
        console.log(`Now there are currently ${docs.length} exif records added `)
    } else {
        console.log(`There is a missmatch of ${Math.abs(docs.length - not_exif_db.length)} documents`)
    }
    }catch(e){
        console.error(e)
    }
}

function removeDS(item) {
    return item !== '.DS_Store'
}

module.exports = async function initialisePhotoWatcher(dir = '', interval = 30 * 60 * 1000) {
    try {
        const stats = await fs.stat(__dirname + '/..' + dir)
        if (!stats.isDirectory()) {
            console.log('It needs to be a folder!')
            process.exit(1)
        }
        findNewPhotos(__dirname + '/..' + dir)
        setInterval(() => {
            findNewPhotos(__dirname + '/..' + dir)
        }, interval)
    } catch (e) {
        console.log(e)
    }
}