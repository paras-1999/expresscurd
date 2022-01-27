import express from 'express'
const app = express()

app.use(loggingMiddleware)//global call
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/users', validation, (req, res) => { // local call
    res.sendFile('form.html', { root: '.' })
})

function loggingMiddleware(req, res, next) {
    console.log('tryto log in')
    next()
}
function validation(req, res, next) {
    console.log('verified user')
    next()
}

app.listen(3000, () => console.log('Server Started'))