var express = require('express')
var app = express()
app.use(express.static(__dirname + '/public/dist/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html')
})
app.listen(8000, function(){
    console.log('listening on port 8000')
})