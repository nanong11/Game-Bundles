//express JS
const express = require(`express`);
const app = express();
const PORT = 3011;

//prevent blocking of request from client esp different domains
const cors = require(`cors`);
app.use(cors());

//for env file
const dotenv = require(`dotenv`);
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//for connecting in mongoDB using mongoose
const mongoose = require('mongoose');
const { urlencoded } = require('express');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once(`open`, () => console.log(`Connected to Database..`));

//for routes
const userRoutes = require(`./routes/userRoutes`)
app.use(`/api/users`, userRoutes)


app.listen(PORT, console.log(`Connected to server ${PORT}..`));