const express = require("express");
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const usersRouter = require("./routes/api/users");
const transactionsRouter = require("./routes/api/transactions");
const db = require('./config/keys').mongoURI;
const usePassport = require('./config/passport');
const path = require('path');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(passport.initialize());
usePassport(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
