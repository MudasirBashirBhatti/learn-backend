import express from 'express'

const app = express()

// both res.end and res.send used to send simple strings. Additionaly res.end is used to send large data like streaming data or videos data. while res.send is used to send raw string and for small data
app.get("/", (req, res) => {
    res.send("hello express js")
})

app.post("/end", (req, res) => {
    res.end("heollos")
})

// this will simply download the file in browser but on post man it will only show the file rather download it.
app.get("/download", (req, res) => {
    res.download("./uploads/dummy.webp")
})

//we can redirect to any route
app.post("/login", (req, res) => {
    res.redirect("https://www.google.com")
})

app.listen(8000, () => {
    console.log("app listens on port 8000")
})