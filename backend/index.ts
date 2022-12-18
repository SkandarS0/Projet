import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const app = express();
const port = 3000;

import playlistsRouter from './routers';


app.use(
	bodyParser.json({
		limit: 70000000000,
	})
);
app.use(
	cors(),
)
app.use('/playlists', playlistsRouter, cors());

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	console.log(__dirname);
});
