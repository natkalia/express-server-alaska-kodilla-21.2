const express = require('express');
const path = require('path');

const app = express();

// middleware providing correct paths for all endpoints
// using method res.show
app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname + `/views/${name}`));
  };
  next();
});

// middleware express.static for serving external files
// like images
app.use(express.static(path.join(__dirname + '/public')));

// middleware for checking auth users
app.use('/user', (req, res, next) => {
  res.show('forbidden.html');
  next();
});

// home endpoint
app.get('/', (req, res) => {
  res.show('home.html');
});

// about endpoint
app.get('/about', (req, res) => {
  res.show('about.html');
});

// contact endpoint
app.get('/forbidden', (req, res) => {
  res.show('forbidden.html');
});

// 404
app.use((req, res) => {
  res.show('404.html');
})

app.listen(8001, () => {
  console.log('Server is running on port: 8001');
});