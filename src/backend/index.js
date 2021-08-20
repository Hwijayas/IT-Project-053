const Express = require('express');
const Cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = Express();

// mongoDB connection string
const mongoURI = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PW + '@cluster0.g7t1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const server = require('http').Server(app);
app.use(Cors());
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
