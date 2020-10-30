const express = require("express")
const app = express()

app.use("/assets", (req, res, next) => {
    /**
     * Server only gets hit if time between requests is > 1s (No network request).
     * Otherwise if the request is between 1-60s the client will be served the stale content from the cache
     * while the server will be requested for fresh content in the background (Cache Response + Network Request).
     * If the request is fired after > 60s the client will not be served stale content, the server will respond with 
     * fresh content (Network request only).
     */
    res.setHeader("Cache-Control", "max-age=1, stale-while-revalidate=59")
    console.log("getting hit at ", req.url)
    next()
})
app.use("/assets", express.static("assets", {etag: false}))

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))


app.listen(3000)