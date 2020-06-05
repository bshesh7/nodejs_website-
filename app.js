var PORT = (process.env.PORT)?process.env.PORT:3000;
var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'api.json'
});

// Performs label detection on the image file
client
    .labelDetection('./women.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label));
        //console.log(results);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });

app.set('view engine', 'ejs');
app.use( express.static('./public'))

app.listen(PORT);
console.log('listening to port 3000');


//fire controllers
todoController(app);

