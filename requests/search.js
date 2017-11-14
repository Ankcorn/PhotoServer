const fuse = require('fuse.js')
const exif = require('../services/exifdata')

module.exports = async function (req,res){
    const query = req.params.query;
    const metadata = await exif.listAllRecords();
    
}