const express = require("express")
const app = express()
const redis = require("redis")
const fetch = require("node-fetch")

const client = redis.createClient()

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

app.get("/:word", (req, res) => {
    const {word} = req.params
    client.get(word, (err, data) => {
        if(err) console.error(err)
        else {
            if(!data) {
                console.log("Sending Request")
                fetch("http://api.urbandictionary.com/v0/define?term=" + word)
                .then(res => {
                    return res.json()
                })
                .then(json => {                    
                    //For demonstration purposes the TTL will be small
                    client.setex(word, 30, JSON.stringify(json), (err) => {
                        if(err) console.error(err)
                        else {
                            res.send(json)
                        }
                    })
                })                                
                .catch(err => console.error(err))
            } else {
                console.log("Hitting cache")
                res.send(JSON.parse(data))
            }
        }
    })
})

app.listen(3000)