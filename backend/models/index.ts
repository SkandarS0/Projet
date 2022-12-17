export interface DBPlaylist {
	_id?: string;
	name: string;
	date_created: Date;
	image: string;
	albums?: Array<Album>;
	tracks?: Array<Track>;
}

export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: Array<string>;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Array<Image>;
	name: string;
	release_date: Date;
	release_date_precision: string;
	restrictions: {
		reason: string;
	};
	type: string;
	uri: string;
	artists: Array<Artist>;
	tracks: Array<Track>;
}
interface Image {
	height: number;
	url: string;
	width: number;
}

interface Artist {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	genres: Array<string>;
	href: string;
	id: string;
	images: Image;
	name: string;
	popularity: number;
	type: string;
	uri: string;
}
interface Track {}
export interface AlbumsSearchResponse {
	href: string;
	items: Array<Album>;
	limit: number;
	next: string;
	offset: number;
	previous: null;
	total: number;
}
export interface ArtistsSearchResponse {
	href: string;
	items: Array<Album>;
	limit: number;
	next: string;
	offset: number;
	previous: null;
	total: number;
}
export interface TracksSearchResponse {
	href: string;
	items: Array<Album>;
	limit: number;
	next: string;
	offset: number;
	previous: null;
	total: number;
}
export interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}

export interface SearchResponse {
	tracks: TracksSearchResponse;
	albums: AlbumsSearchResponse;
}
