import cors from 'cors';
import express from 'express';
const playlistsRouter = express.Router();
import { MongoClient, ObjectId } from 'mongodb';
import { ENV } from '../environment/environment';
import { DBPlaylist } from '../models';
const client = new MongoClient(`mongodb://${ENV.DB_HOST}:${ENV.DB_PORT}/`, {
	directConnection: true,
	ssl: false,
	readPreference: 'primary',
});
const db = client.db('spotify');
playlistsRouter.get('/', async (req, res) => {
	let limit = req.query.limit || '0';
	let sort_field = req.query.sort_field || 'date_created';
	let sort_order = req.query.sort_order || '-1';
	let q = req.query.q || '';
	let q_field = req.query.q_field || '-1';
	let sortConfig: any = {};
	let matchConfig: any = {};
	sortConfig[sort_field.toString()] = parseInt(sort_order.toString());
	matchConfig[q_field.toString()] = {
		$regex: RegExp(q.toString() == '' ? '.' : q.toString(), 'ig'),
	};
	var playlists = db.collection('playlists').aggregate([
		{
			$match:
				q.toString() === '' || q_field.toString() === '' ? {} : matchConfig,
		},
		{
			$addFields: {
				n_albums: {
					$size: '$albums',
				},
			},
		},
		{
			$sort: sortConfig,
		},
	]);
	res.json(
		Number(limit) == 0
			? await playlists.toArray()
			: await playlists.limit(Number(limit)).toArray()
	);
});
playlistsRouter.post('/create', async (req, res) => {
	let playlistObject = await db.collection('playlists').insertOne(req.body);
	let playlist = await db
		.collection('playlists')
		.findOne({ _id: playlistObject.insertedId });
	res.status(201).json(playlist);
});

playlistsRouter.patch('/add_to/:playlist_id', async (req, res) => {
	let id = new ObjectId(req.params.playlist_id);
	let playlist_update = await db
		.collection('playlists')
		.updateOne({ _id: id }, { $addToSet: { albums: { $each: req.body } } });
	res.status(204).json(playlist_update);
});
export default playlistsRouter;
