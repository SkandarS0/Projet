import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ENV } from 'backend/environment/environment';
import { CookieService } from 'ngx-cookie-service';
import {
	BehaviorSubject,
	catchError,
	map,
	mergeMap,
	Observable,
	of,
	retry,
	tap,
} from 'rxjs';
import {
	Album,
	AlbumsSearchResponse,
	SearchResponse,
	TokenResponse,
} from 'backend/models';
@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	private tokenSubject: BehaviorSubject<string>;
	private SPOTIFY_ENDPOINT: string = 'https://api.spotify.com/v1';
	public token: Observable<string>;

	constructor(private http: HttpClient, private cookies: CookieService) {
		this.tokenSubject = new BehaviorSubject(cookies.get('token'));
		this.token = this.tokenSubject.asObservable();
	}
	public get tokenVal() {
		return this.tokenSubject.value;
	}
	private get_token() {
		let token_url = 'https://accounts.spotify.com/api/token';
		return this.http
			.post<TokenResponse>(
				token_url,
				new HttpParams().appendAll({
					client_id: ENV.CLIENT_ID,
					client_secret: ENV.CLIENT_SECRET,
					grant_type: 'client_credentials',
				})
			)
			.pipe(
				map((response) => {
					this.cookies.set(
						'token',
						response.access_token,
						new Date(new Date().setSeconds(response.expires_in))
					);
					this.tokenSubject.next(response.access_token);
					return response.access_token;
				})
			);
	}
	getNewReleases(
		config: {
			limit?: number;
			offset?: number;
			country?: string;
		} = {
			limit: 20,
			offset: 0,
		}
	) {
		let endpoint = '/browse/new-releases';
		return this.tokenVal != ''
			? this.http
					.get<SearchResponse>(`${this.SPOTIFY_ENDPOINT}${endpoint}`, {
						params: config,
						headers: {
							Authorization: `Bearer ${this.tokenVal}`,
						},
					})
					.pipe(
						catchError((err) => {
							return of();
						}),
						retry(3)
					)
			: this.get_token().pipe(
					mergeMap((token) =>
						this.http.get<SearchResponse>(
							`${this.SPOTIFY_ENDPOINT}${endpoint}`,
							{
								params: config,
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						)
					)
			  );
	}
	search(
		config: {
			q?: string;
			limit?: number;
			offset?: number;
			country?: string;
			include_external?: string;
			type?: string;
		} = { limit: 20, offset: 0, type: 'album', include_external: 'audio' }
	) {
		let endpoint = '/search';
		return this.tokenVal != ''
			? this.http
					.get<SearchResponse>(`${this.SPOTIFY_ENDPOINT}${endpoint}`, {
						params: config,
						headers: {
							Authorization: `Bearer ${this.tokenVal}`,
						},
					})
					.pipe(
						tap((response) => {
							if (response.albums) {
								response.albums.items = response.albums?.items.filter(
									(item) => {
										return item != null;
									}
								);
							}
						})
					)
					.pipe(
						catchError((err) => {
							return of();
						}),
						retry(3)
					)
			: this.get_token()
					.pipe(
						mergeMap((token) =>
							this.http.get<SearchResponse>(
								`${this.SPOTIFY_ENDPOINT}${endpoint}`,
								{
									params: config,
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							)
						)
					)
					.pipe(
						tap((response) => {
							if (response.albums) {
								response.albums.items = response.albums?.items.filter(
									(item) => {
										return item != null;
									}
								);
							}
						})
					);
	}
	getAlbum(id: string, config?: { market?: string }) {
		let endpoint = '/albums';
		return this.tokenVal != ''
			? this.http
					.get<Album>(`${this.SPOTIFY_ENDPOINT}${endpoint}/${id}`, {
						params: config,
						headers: {
							Authorization: `Bearer ${this.tokenVal}`,
						},
					})
					.pipe(
						catchError((err) => {
							return of();
						}),
						retry(3)
					)
			: this.get_token().pipe(
					mergeMap((token) =>
						this.http.get<Album>(`${this.SPOTIFY_ENDPOINT}${endpoint}`, {
							params: config,
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
					)
			  );
	}
}
