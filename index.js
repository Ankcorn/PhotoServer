const express = require("express")
const morgan = require("morgan")
const path = require("path")
const cors = require("cors")
const app = express()

const photometadata = require("./requests/photometadata")
const getphotobyid = require("./requests/getphoto")
app.use(cors())

app.use(morgan("tiny"))

app.use(express.static(__dirname + "/../assets"))

app.get("/photos", photometadata)

app.get("/photos/:id/:width/:height", getphotobyid)

const server = app.listen(3000, () => {
  console.log("Starting server on port 3000")
})
