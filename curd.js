import express from 'express'
import fs from 'fs';
const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    let data = fs.readFileSync('home.html');
    let list = fs.readFileSync('emplist.txt').toString().split(`*`);
    let emplist = [];
    list.map(val =>
        emplist.push(JSON.parse(val))
    )
    let body = ''
    emplist.map((val, i) =>
        body += `<tr><td>${val.name}</td><td>${val.email}</td><td>${val.phone}</td><td>${val.age}</td><td><a href="/delete/${i}"><button type="button" class="btn btn-danger mx-1">delete</button></a><a href="/update/${i}"><button type="button" class="btn btn-info mx-1">update</button></a></td></tr>`
    )
    res.send(`${data} ${body} </tbody>
        </table>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </body>
    </html>`);
})
app.get("/delete/:id([0-9]+)", (req, res) => {
    let id = req.params.id;
    let list = fs.readFileSync('emplist.txt').toString().split(`*`);
    let emplist = [];
    list.map(val =>
        emplist.push(JSON.parse(val))
    )
    emplist.splice(id, 1)
    let newdata = '';
    emplist.map(val => {
        newdata += JSON.stringify(val) + '*';
    })
    newdata = newdata.substr(0, newdata.length - 1)
    // console.log(newdata)
    fs.writeFile('emplist.txt', `${newdata}`, (err) => { if (err) throw err; console.log("file written") });
    res.redirect("/")

})
app.get("/update/:id([0-9]+)", (req, res) => {
    let data = fs.readFileSync('updateform.html');
    res.send(`${data}`)
})
app.post("/update/:id([0-9]+)", (req, res) => {
    let id = req.params.id;
    let newdataa = { name: req.body.name, email: req.body.email, phone: req.body.phone, age: req.body.age }
    let list = fs.readFileSync('emplist.txt').toString().split(`*`);
    let emplist = [];
    list.map(val =>
        emplist.push(JSON.parse(val))
    )
    // console.log(emplist)
    emplist.splice(id, 1, newdataa)
    // console.log(emplist)
    let newdata = '';
    emplist.map(val => {
        newdata += JSON.stringify(val) + '*';
    })
    newdata = newdata.substr(0, newdata.length - 1)
    // console.log(newdata)
    fs.writeFile('emplist.txt', `${newdata}`, (err) => { if (err) throw err; console.log("file written") });
    res.redirect("/")
})

app.get("/form", (re, res) => {
    let data = fs.readFileSync('form.html');
    res.send(`${data}`)
})

app.post('/form', function (req, res) {
    fs.appendFile('emplist.txt', `*{"name":"${req.body.name}","email":"${req.body.email}","phone":"${req.body.phone}","age":"${req.body.age}"}`, (err) => { if (err) throw err; })
    res.redirect("/")
})
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`working on port :${port}`)
})