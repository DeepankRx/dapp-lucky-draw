const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserRouter = require('./routers/user');
const WinnerRouter = require('./routers/winners');
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5000;
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
mongoose.connect('mongodb://localhost:27017/luckydraw');
mongoose.connection.on('error', () => {
  console.log("Can't connect to database");
});
mongoose.connection.once('open', () => {
  console.log('Connected to DB!');
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/', UserRouter);
app.use('/', WinnerRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
