//MONGODB PASS Erianafranky1
//MONGODB connection mongodb+srv://arianadottie:<password>@cluster0-7eloq.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb+srv://arianadottie:Erianafranky1@cluster0-7eloq.mongodb.net/test?retryWrites=true&w=majority')
	.then(() => {
		console.log('successfully connected to MongoDB Atlas!');
	})
	.catch((error) => {
		console.log('Unable to connect to MongoDB Atlas!');
		console.error(error);
	});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
	const thing = new Thing({
		title: req.body.title,
		description: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		userId: req.body.userId
	});
	thing.save().then(
		() => {
			res.status(201).json({
				message: 'Post saved successfully!'
			})
		}
	).catch(
	(error) => {
		res.status(400).json({
			error: error
		});
	}
	);
});

app.get('/api/stuff/:id', (req, res, next) => {
	Thing.findOne({
		_id: req.params.id
	}).then(
	(thing) => {
		res.status(200).json(thing);
	}
	).catch(
	(error) => {
		res.status(404).json({
			error: error
		});
	}
	);
});

app.put('/api/stuff/:id', (req, res, next) => {
	const thing = new Thing({
		_id: req.params.id,
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		userId: req.body.userId
	});
	Thing.updateOne({_id: req.params.id}, thing).then(
		() => {
			res.status(201).json({
				message: 'Thing updated succesfully!'
			});
		}
		).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
		);
});	

app.use('/api/stuff', (req, res, next) => {
	Thing.find().then(
		(things) => {
			res.status(200).json(things);
		}
		).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
		);
});

module.exports = app;