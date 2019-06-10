const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
var servestatic = require('serve-static')

const app = express()
app.use(servestatic(__dirname + "/build"))
app.use(bodyParser.json())
app.use(cors())
/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });*/
require('./routes/routes')(app)
app.listen(config.port, ()=>console.log("app listening at port ", config.port, "...."))