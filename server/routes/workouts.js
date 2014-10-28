module.exports = function(app){

  var fs = require('fs');

  app.get('/workouts/:weight', function(req, res){

    console.log('received request for weight data: ', req.headers);

    var weight = req.params.weight;

    fs.readFile('./server/data/processed.json', 'utf-8', function(err, data){
      if (err) throw err;
      var regimen = JSON.parse(data.trim())[weight];
    
      res.status(200).send(regimen);
    });
  });
};
