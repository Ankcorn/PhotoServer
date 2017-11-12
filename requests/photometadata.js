const fs = require("fs-extra")
const exif = require("fast-exif")

module.exports = async function(req, res) {
  try {
    const fileList = await fs.readdir(__dirname + "/../photos")
    const parsedPhotoList = fileList.filter(removeDS)
    const exifList = await Promise.all(parsedPhotoList.map(async(path)=>{return await exif.read(__dirname + "/../photos/"+path)}))
    console.log(JSON.stringify(exifList))
    res.send(exifList)
  } catch (e) {
    console.error(e)
    res.status(500).send(JSON.stringify(e))
  }
}


function removeDS(item){
    return item!=='.DS_Store'
}
