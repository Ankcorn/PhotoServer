const fs = require('fs-extra')

module.exports = async function (req, res) {
    try {
        const fileList = await fs.readdir(__dirname + '/../photos')
        res.send(fileList)
    } catch (e) {
        res.status(500).send(err)
    }
}