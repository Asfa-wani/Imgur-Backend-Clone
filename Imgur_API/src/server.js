// import usersRoutes from './routes/users.js';

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
require('./db/connect');

const User = require('./models/users');
const Image = require('./models/imgupload');

const app = express();

const imageApp = express();

const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json()); // we are going to use json data in out whole application.

// app.use('/users', usersRoutes);

app.use(express.json());

// Home Page
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultView : 'default',
    layoutsDir : path.join(__dirname , 'view'),
    partialsDir : path.join(__dirname, 'view/partials')
}))


app.get('/', (req, res) => {
  res.send('Hello from the other side.');
});
// Register User
app.post('/users', async (req, res) => {
 const user = new User(req.body);

  try{
   await user.save()
   console.log(user);
    res.status(201).send(user);
  } 
    catch(err){
      res.status(400).send(err);
    };
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send();
  }
});

// Get single user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
});
// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});
// patch user
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'phone', 'address'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/images', async (req, res) => {
  try {
    const image = new Image(req.body);
    await image.save();
    res.status(201).send(image);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).send(images);
  } catch (err) {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
