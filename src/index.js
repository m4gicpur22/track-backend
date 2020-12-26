require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require('./middlewares/requireAuth');
const app = express();


app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);


const portnumber = 3000;
const mongoURI = 'mongodb+srv://Afftrack:afftrack@cluster0.ka7jd.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongoDB instance!");
});

mongoose.connection.on('error', (err) => {
    console.error('Error connected to mongo: ', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Email: ${req.user.email}`);
});

app.listen(portnumber, () => {
    console.log(`Server has started on port ${portnumber}`);
});