const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./model/db')
const postController = require('./controller/post')
const imageController = require('./controller/image')
require('./model/Image');
require('./model/Post')
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './view/index.html'));
});

app.get('/pictures', (req, res) => {
  res.sendFile(path.join(__dirname, './view/picture-upload.html'));
})

app.use('/api', postController)
app.use('/api/images', imageController)

app.listen(3001, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('http://localhost:3001');
});
