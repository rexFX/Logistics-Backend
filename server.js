require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 4000;

const registration = require('./routes/register');
const login = require('./routes/login');
const fetchMessages = require('./routes/fetchMessages');
const postMessages = require('./routes/postMessages');
const transporterList = require('./routes/fetchTransportersList');
const orderList = require('./routes/fetchOrderList');
const postOrderMessages = require('./routes/postOrderMessages');
const pay = require('./routes/pay');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server up and running');
});

app.use('/api/', (req, res, next) => {
  req.io = io;
  next();
}, login);

app.use('/api/', registration);
app.use('/api/', fetchMessages);
app.use('/api/', postMessages);
app.use('/api/', transporterList);
app.use('/api/', orderList);
app.use('/api/', postOrderMessages);
app.use('/api/', pay);


const mongo = async () => await mongoose.connect(process.env.MONGO_DB);

mongo().then(() => {
  console.log('MongoDB Connected');
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});