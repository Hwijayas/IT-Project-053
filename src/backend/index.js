const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

const userRoutes = require('../backend/routes/userRouter');

// mongoDB connection string
const mongoURI = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PW + '@cluster0.g7t1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(
    mongoURI,
    { useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        dbName: "BitsRM"
    }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

const server = require('http').Server(app);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/status', (req,res)=>{
	res.status(200).json(
		{
		appName: 'API',
		time: Date.now(),
		status: 'OK',
		});
	});
server.listen(PORT, err => {
	if(err){
		console.log(`${err}`);
	}else{
		console.log(`\n\nAPI STATUS: OK\nListening on port: ${PORT}\n`);
	}
});

app.use('/user', userRoutes);

module.exports = app;