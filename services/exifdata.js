const exif = require('fast-exif')
const Datastore = require('nedb-promise')

const db = new Datastore({filename: '../data/exif', autoload: true})

async function generateExifData(photo_name) {
    console.log('generating data')
    return {filepath:photo_name,exif:await exif.read(__dirname + '/../photos/' +photo_name)}
}


async function writeExifData(filename){
   try{
     console.log('Writing new exif record')
     const exif_data = await generateExifData(filename)
     return db.insert(exif_data)
   }catch(e){
    console.log('welp');
   }
}

async function listAllRecords(){
    try{
        const data = await db.find({})
        if(data.length>0&&data[0].hasOwnProperty('filepath')){
            return data.map(el=>el.filepath)
        }else{
            return 'no files found'
        }
    }catch(e){
        console.log('Fetching List of data failed')
    }
}

module.exports = {
    listAllRecords,
    generateExifData,
    writeExifData
}