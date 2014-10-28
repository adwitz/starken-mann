var express  = require('express');

var app = express();
var port =  process.env.PORT || 3000; // set port with $PORT environment variable

app.listen(port);
app.use(express.static(__dirname + '/../www'));

// require('./routes/appRoutes.js')(app);
// require('./routes/pathRoutes.js')(app);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


require('./routes/workouts')(app);

console.log('now serving on port: ', port);