const express = require("express")
const app = express()

// weak etag is on by default
app.use("/assets", (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache")
    next()
})
app.use("/assets", express.static("assets"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000)