import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DBPlaylist } from 'backend/models';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlaylistsService } from '../services/playlists.service';

@Component({
	templateUrl: './list.component.html',
	selector: 'list-playlists',
})
export class ListPlaylists implements OnInit {
	playlists: DBPlaylist[] = [];
	is_searching: boolean = false;
	search_form: FormGroup = new FormGroup({
		q_field: new FormControl(''),
		q: new FormControl(''),
		limit: new FormControl('0', [Validators.min(0)]),
		sort_field: new FormControl('date_created'),
		sort_order: new FormControl('-1'),
	});
	faSearch = faSearch;
	faTrash = faTrash;
	constructor(private playlistsService: PlaylistsService) {}
	ngOnInit(): void {
		this.getPlaylists();
	}
	getPlaylists() {
		this.playlistsService.getPlaylists().subscribe((response) => {
			this.playlists = response;
		});
	}
	invokeSearch() {
		this.is_searching = true;
		if (this.search_form.controls['q_field'].value != '') {
			this.playlistsService
				.getPlaylists(this.search_form.value)
				.subscribe((response) => (this.playlists = response));
			this.search_form.controls['q'].setValue('');
		} else {
			if (this.search_form.controls['q'].value == '') {
				this.playlistsService
				.getPlaylists(this.search_form.value)
				.subscribe((response) => (this.playlists = response));
			}
		}
	}
	deletePlaylist(playlist_id: string) {
		this.playlistsService.deletePlaylist(playlist_id).subscribe(()=> {
			this.playlistsService.getPlaylists(this.search_form.value).subscribe((response)=>{
				this.playlists = response;
			})
		});
	}
}
