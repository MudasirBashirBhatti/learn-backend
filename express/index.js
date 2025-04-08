import express from 'express'
import multer from 'multer'

const app = express()
app.use(express.json())


// ........................middlewares.........................

// 1. app level middleware
// this middleware will be called for all routes

app.use((req, res, next) => {
    console.log('an endpoint is hitted')
    next()
})

// 2.route level middlewares
// this middleware will be called only uploadFile hit
app.use('/uploadFile', (req, res, next) => {
    console.log('uploadFile called!')
    next()
})

// ...........................simple requests..............

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

//we can add key&values to response header
app.post("/appendHeader", (req, res) => {
    res.append("name", "Mudasir Bashir")
    res.append("city", "Multan")

    res.status(201).end("key value added to response header")
})

//we can set cookies data using using express by res.cookie
app.post("/saveCookie", (req, res) => {
    res.cookie("name", "Mudasir Bashir")
    res.cookie("city", "Multan")

    res.end("Cookie set successfully")
})

//clear cookies in express
app.post("/removeCookie", (req, res) => {
    res.clearCookie("name")
    res.clearCookie("city")

    res.end("Cookies cleared successfully")
})

// .............................getAPIs............................

//http://localhost:8000/getData?name=Mudasir Bashir&age=18
app.get('/getData', (req, res) => {
    const { name, age } = req.query
    res.send(`My name is ${name} and I'm ${age} years old`)
})

app.get('/dataFromHeader', (req, res) => {
    const { name, age } = req.headers
    res.send(`My name is ${name} and I'm ${age} years old`)
})


// .............................use query data............................

app.post('/postQuery', (req, res) => {
    let first = req.query.firstName
    let last = req.query.lastName
    res.send(`My name is ${first} ${last}`)
})

// ............................post json data........................ 
app.post('/postJson', (req, res) => {
    let jsonData = req.body
    let jsonString = JSON.stringify(jsonData)
    res.send(jsonString)
})

// ..........................post formData.......................'

app.post('/uploadFile', (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads')
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    })

    const upload = multer({ storage: storage, limits: { fileSize: 20 * 1024 * 1024 } }).any('myFile')

    upload(req, res, (error) => {
        if (error) {
            res.send(`Failed to upload file ${error}`)
        }
        else {
            res.send('File uploaded successfully!')
        }
    })
})

app.listen(8000, () => {
    console.log("app listens on port 8000")
})
