const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/imgurbackend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to ImagrBackend Database');
  })
  .catch((err) => {
    console.log(err);
  });
