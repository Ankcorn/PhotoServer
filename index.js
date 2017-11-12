const express = require("express")
const morgan = require("morgan")
const path = require("path")
const cors = require("cors")
const app = express()
const initialisePhotoWatcher = require('./services/checkphotodir')
const photometadata = require("./requests/photometadata")
const getphotobyid = require("./requests/getphoto")

initialisePhotoWatcher('/photos')

app.use(cors())

app.use(morgan("tiny"))

app.get("/photos", photometadata)

app.get("/photos/:id/:width/:height", getphotobyid)

const server = app.listen(3000, () => {
  console.log("Starting server on port 3000")
})
