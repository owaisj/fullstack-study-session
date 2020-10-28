const express = require('express');
const path = require('path');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
});

// MODEL
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
});
app.use(express.json())

// VIEW
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// CONTROLLER
// Create entity
app.post('/api/posts', async (req, res) => {
  const { body } = req;
  console.log(req.body)
  try {
    const post = await Post.create(body);
    res.json({
      success: true,
      ...post,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to create post',
    });
  }
});

// Update entity
app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.update(req.body, { where: { id } });
    const post = await Post.findAll({ where: { id } });
    res.json({
      success: true,
      message: `Updated post ${id}`,
      post // same as below 
      // post: post
    })
  } catch(e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to update post',
    });
  }
})

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req)
  try {
    // Query the database for the record you're looking for
    const post = await Post.findAll({ where: { id } });
    res.json({
      success: true,
      post
    })
  } catch(e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Unable to find post',
    });
  }
})

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id }});
    res.json({
      success: 'yep',
      message: `Deleted Post ${req.params.id}`
    })
  } catch(e) {
    res.status(500).json({
      success: 'nope'
    })
  }

})

// With async/await
app.get('/api/posts', async (req, res) => {
  const posts = await Post.findAll();
  // const articles = await Article.findAll()
  // res.json({ posts, articles });
  res.json(posts)
});

// w/o async-await
// app.get('/api/posts', (req, res) => {
//   Post.findAll().then(posts => {
//     // posts is in the upper scope
//     Article.findAll().then(articles => {
//       // articles, and posts
//       res.json({
//         articles,
//         posts
//       })
//     })
//   });
// });

app.listen(3001, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('http://localhost:3001');
});
