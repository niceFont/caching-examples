const express = require("express")
const app = express()

app.use(express.static("build", {immutable: true, maxAge: "1y", etag: false}))
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"))
app.get("*",)
app.listen(3000)