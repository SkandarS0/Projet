import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from 'backend/environment/environment';
import { Album, DBPlaylist } from 'backend/models';

@Injectable({
	providedIn: 'root',
})
export class PlaylistsService {
	private BACKEND_ENDPOINT: string = `${ENV.BACKEND_HOST}:${ENV.BACKEND_PORT}`;
	constructor(private http: HttpClient) {}
	newPlaylist(playlist: DBPlaylist) {
		return this.http.post<DBPlaylist>(
			`${this.BACKEND_ENDPOINT}/playlists/create`,
			playlist
		);
	}
	getPlaylists(config?: any) {
		return this.http.get<DBPlaylist[]>(`${this.BACKEND_ENDPOINT}/playlists/`, {
			params: config,
		});
	}
	addToPlaylist(playlist_id: string, albums: Album[]) {
		return this.http.patch(
			`${this.BACKEND_ENDPOINT}/playlists/add_to/${playlist_id}`,
			albums
		);
	}
	deletePlaylist(playlist_id: string) {
		return this.http.delete(
			`${this.BACKEND_ENDPOINT}/playlists/${playlist_id}`
		);
	}
}
