import express from 'express'
const app = express();
const port = 3000;
import router from './routes/user.js'
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/user', router);
app.get('/', (req, res) => {
    res.sendFile('form.html', { root: '.' })
})
app.get("/cat/:cname([a-z]+)", (req, res) => {
    //reading param value
    let cn = req.params.cname;
    res.send(`the category is ${cn}`)
})
app.get("/catdata/:cname/:subcat?", (req, res) => {
    //reading param value
    let cn = req.params.cname;
    let scn = req.params.subcat;
    if (scn != undefined) {
        res.send(`the category is ${cn} and subcat is${scn}`)
    }
    else {
        res.send(`the category is ${cn}`)
    }
})
app.get('*', (req, res) => {
    res.send('invalid url')
})
app.post('/show', function (req, res) {
    res.send(`Name:${req.body.name} email:${req.body.email} phone ${req.body.phone} age ${req.body.age}`)
})


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`working on port :${port}`)
})