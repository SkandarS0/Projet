import {
	Component,
	ElementRef,
	HostListener,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DBPlaylist, SearchResponse } from 'backend/models';
import { tap, forkJoin } from 'rxjs';
import { PlaylistsService } from '../services/playlists.service';
import { SpotifyService } from '../services/spotify.service';

@Component({
	templateUrl: './releases.component.html',
	selector: 'list-releases',
})
export class ListNewReleases {
	ITEMS_TO_SHOW: SearchResponse[] = [];
	newPlaylistName = new FormControl('', [Validators.required]);
	savedPlaylists: DBPlaylist[] = [];
	COUNTRIES = [
		{
			country: 'Albania',
			code: 'AL',
		},
		{
			country: 'Algeria',
			code: 'DZ',
		},
		{
			country: 'Andorra',
			code: 'AD',
		},
		{
			country: 'Angola',
			code: 'AO',
		},
		{
			country: 'Antigua and Barbuda',
			code: 'AG',
		},
		{
			country: 'Argentina',
			code: 'AR',
		},
		{
			country: 'Armenia',
			code: 'AM',
		},
		{
			country: 'Australia',
			code: 'AU',
		},
		{
			country: 'Austria',
			code: 'AT',
		},
		{
			country: 'Azerbaijan',
			code: 'AZ',
		},
		{
			country: 'Bahamas (the)',
			code: 'BS',
		},
		{
			country: 'Bahrain',
			code: 'BH',
		},
		{
			country: 'Bangladesh',
			code: 'BD',
		},
		{
			country: 'Barbados',
			code: 'BB',
		},
		{
			country: 'Belarus',
			code: 'BY',
		},
		{
			country: 'Belgium',
			code: 'BE',
		},
		{
			country: 'Belize',
			code: 'BZ',
		},
		{
			country: 'Benin',
			code: 'BJ',
		},
		{
			country: 'Bhutan',
			code: 'BT',
		},
		{
			country: 'Bolivia (Plurinational State of)',
			code: 'BO',
		},
		{
			country: 'Bosnia and Herzegovina',
			code: 'BA',
		},
		{
			country: 'Botswana',
			code: 'BW',
		},
		{
			country: 'Brazil',
			code: 'BR',
		},
		{
			country: 'Brunei Darussalam',
			code: 'BN',
		},
		{
			country: 'Bulgaria',
			code: 'BG',
		},
		{
			country: 'Burkina Faso',
			code: 'BF',
		},
		{
			country: 'Burundi',
			code: 'BI',
		},
		{
			country: 'Cabo Verde',
			code: 'CV',
		},
		{
			country: 'Cambodia',
			code: 'KH',
		},
		{
			country: 'Cameroon',
			code: 'CM',
		},
		{
			country: 'Canada',
			code: 'CA',
		},
		{
			country: 'Chad',
			code: 'TD',
		},
		{
			country: 'Chile',
			code: 'CL',
		},
		{
			country: 'Colombia',
			code: 'CO',
		},
		{
			country: 'Comoros (the)',
			code: 'KM',
		},
		{
			country: 'Congo (the Democratic Republic of the)',
			code: 'CD',
		},
		{
			country: 'Congo (the)',
			code: 'CG',
		},
		{
			country: 'Costa Rica',
			code: 'CR',
		},
		{
			country: 'Croatia',
			code: 'HR',
		},
		{
			country: 'Cura\u00e7ao',
			code: 'CW',
		},
		{
			country: 'Cyprus',
			code: 'CY',
		},
		{
			country: 'Czechia',
			code: 'CZ',
		},
		{
			country: "C\u00f4te d'Ivoire",
			code: 'CI',
		},
		{
			country: 'Denmark',
			code: 'DK',
		},
		{
			country: 'Djibouti',
			code: 'DJ',
		},
		{
			country: 'Dominica',
			code: 'DM',
		},
		{
			country: 'Dominican Republic (the)',
			code: 'DO',
		},
		{
			country: 'Ecuador',
			code: 'EC',
		},
		{
			country: 'Egypt',
			code: 'EG',
		},
		{
			country: 'El Salvador',
			code: 'SV',
		},
		{
			country: 'Equatorial Guinea',
			code: 'GQ',
		},
		{
			country: 'Estonia',
			code: 'EE',
		},
		{
			country: 'Eswatini',
			code: 'SZ',
		},
		{
			country: 'Fiji',
			code: 'FJ',
		},
		{
			country: 'Finland',
			code: 'FI',
		},
		{
			country: 'France',
			code: 'FR',
		},
		{
			country: 'Gabon',
			code: 'GA',
		},
		{
			country: 'Gambia (the)',
			code: 'GM',
		},
		{
			country: 'Georgia',
			code: 'GE',
		},
		{
			country: 'Germany',
			code: 'DE',
		},
		{
			country: 'Ghana',
			code: 'GH',
		},
		{
			country: 'Greece',
			code: 'GR',
		},
		{
			country: 'Grenada',
			code: 'GD',
		},
		{
			country: 'Guatemala',
			code: 'GT',
		},
		{
			country: 'Guinea',
			code: 'GN',
		},
		{
			country: 'Guinea-Bissau',
			code: 'GW',
		},
		{
			country: 'Guyana',
			code: 'GY',
		},
		{
			country: 'Haiti',
			code: 'HT',
		},
		{
			country: 'Honduras',
			code: 'HN',
		},
		{
			country: 'Hong Kong',
			code: 'HK',
		},
		{
			country: 'Hungary',
			code: 'HU',
		},
		{
			country: 'Iceland',
			code: 'IS',
		},
		{
			country: 'India',
			code: 'IN',
		},
		{
			country: 'Indonesia',
			code: 'ID',
		},
		{
			country: 'Iraq',
			code: 'IQ',
		},
		{
			country: 'Ireland',
			code: 'IE',
		},
		{
			country: 'Israel',
			code: 'IL',
		},
		{
			country: 'Italy',
			code: 'IT',
		},
		{
			country: 'Jamaica',
			code: 'JM',
		},
		{
			country: 'Japan',
			code: 'JP',
		},
		{
			country: 'Jordan',
			code: 'JO',
		},
		{
			country: 'Kazakhstan',
			code: 'KZ',
		},
		{
			country: 'Kenya',
			code: 'KE',
		},
		{
			country: 'Kiribati',
			code: 'KI',
		},
		{
			country: 'Korea (the Republic of)',
			code: 'KR',
		},
		{
			country: 'Kuwait',
			code: 'KW',
		},
		{
			country: 'Kyrgyzstan',
			code: 'KG',
		},
		{
			country: "Lao People's Democratic Republic (the)",
			code: 'LA',
		},
		{
			country: 'Latvia',
			code: 'LV',
		},
		{
			country: 'Lebanon',
			code: 'LB',
		},
		{
			country: 'Lesotho',
			code: 'LS',
		},
		{
			country: 'Liberia',
			code: 'LR',
		},
		{
			country: 'Libya',
			code: 'LY',
		},
		{
			country: 'Liechtenstein',
			code: 'LI',
		},
		{
			country: 'Lithuania',
			code: 'LT',
		},
		{
			country: 'Luxembourg',
			code: 'LU',
		},
		{
			country: 'Macao',
			code: 'MO',
		},
		{
			country: 'Madagascar',
			code: 'MG',
		},
		{
			country: 'Malawi',
			code: 'MW',
		},
		{
			country: 'Malaysia',
			code: 'MY',
		},
		{
			country: 'Maldives',
			code: 'MV',
		},
		{
			country: 'Mali',
			code: 'ML',
		},
		{
			country: 'Malta',
			code: 'MT',
		},
		{
			country: 'Marshall Islands (the)',
			code: 'MH',
		},
		{
			country: 'Mauritania',
			code: 'MR',
		},
		{
			country: 'Mauritius',
			code: 'MU',
		},
		{
			country: 'Mexico',
			code: 'MX',
		},
		{
			country: 'Micronesia (Federated States of)',
			code: 'FM',
		},
		{
			country: 'Moldova (the Republic of)',
			code: 'MD',
		},
		{
			country: 'Monaco',
			code: 'MC',
		},
		{
			country: 'Mongolia',
			code: 'MN',
		},
		{
			country: 'Montenegro',
			code: 'ME',
		},
		{
			country: 'Morocco',
			code: 'MA',
		},
		{
			country: 'Mozambique',
			code: 'MZ',
		},
		{
			country: 'Namibia',
			code: 'NA',
		},
		{
			country: 'Nauru',
			code: 'NR',
		},
		{
			country: 'Nepal',
			code: 'NP',
		},
		{
			country: 'Netherlands (the)',
			code: 'NL',
		},
		{
			country: 'New Zealand',
			code: 'NZ',
		},
		{
			country: 'Nicaragua',
			code: 'NI',
		},
		{
			country: 'Niger (the)',
			code: 'NE',
		},
		{
			country: 'Nigeria',
			code: 'NG',
		},
		{
			country: 'Norway',
			code: 'NO',
		},
		{
			country: 'Oman',
			code: 'OM',
		},
		{
			country: 'Pakistan',
			code: 'PK',
		},
		{
			country: 'Palau',
			code: 'PW',
		},
		{
			country: 'Panama',
			code: 'PA',
		},
		{
			country: 'Papua New Guinea',
			code: 'PG',
		},
		{
			country: 'Paraguay',
			code: 'PY',
		},
		{
			country: 'Peru',
			code: 'PE',
		},
		{
			country: 'Philippines (the)',
			code: 'PH',
		},
		{
			country: 'Poland',
			code: 'PL',
		},
		{
			country: 'Portugal',
			code: 'PT',
		},
		{
			country: 'Qatar',
			code: 'QA',
		},
		{
			country: 'Republic of North Macedonia',
			code: 'MK',
		},
		{
			country: 'Romania',
			code: 'RO',
		},
		{
			country: 'Rwanda',
			code: 'RW',
		},
		{
			country: 'Saint Kitts and Nevis',
			code: 'KN',
		},
		{
			country: 'Saint Lucia',
			code: 'LC',
		},
		{
			country: 'Saint Vincent and the Grenadines',
			code: 'VC',
		},
		{
			country: 'Samoa',
			code: 'WS',
		},
		{
			country: 'San Marino',
			code: 'SM',
		},
		{
			country: 'Sao Tome and Principe',
			code: 'ST',
		},
		{
			country: 'Saudi Arabia',
			code: 'SA',
		},
		{
			country: 'Senegal',
			code: 'SN',
		},
		{
			country: 'Serbia',
			code: 'RS',
		},
		{
			country: 'Seychelles',
			code: 'SC',
		},
		{
			country: 'Sierra Leone',
			code: 'SL',
		},
		{
			country: 'Singapore',
			code: 'SG',
		},
		{
			country: 'Slovakia',
			code: 'SK',
		},
		{
			country: 'Slovenia',
			code: 'SI',
		},
		{
			country: 'Solomon Islands',
			code: 'SB',
		},
		{
			country: 'South Africa',
			code: 'ZA',
		},
		{
			country: 'Spain',
			code: 'ES',
		},
		{
			country: 'Sri Lanka',
			code: 'LK',
		},
		{
			country: 'Suriname',
			code: 'SR',
		},
		{
			country: 'Sweden',
			code: 'SE',
		},
		{
			country: 'Switzerland',
			code: 'CH',
		},
		{
			country: 'Taiwan (Province of China)',
			code: 'TW',
		},
		{
			country: 'Tajikistan',
			code: 'TJ',
		},
		{
			country: 'Thailand',
			code: 'TH',
		},
		{
			country: 'Timor-Leste',
			code: 'TL',
		},
		{
			country: 'Togo',
			code: 'TG',
		},
		{
			country: 'Tonga',
			code: 'TO',
		},
		{
			country: 'Trinidad and Tobago',
			code: 'TT',
		},
		{
			country: 'Tunisia',
			code: 'TN',
		},
		{
			country: 'Turkey',
			code: 'TR',
		},
		{
			country: 'Tuvalu',
			code: 'TV',
		},
		{
			country: 'Uganda',
			code: 'UG',
		},
		{
			country: 'Ukraine',
			code: 'UA',
		},
		{
			country: 'United Arab Emirates',
			code: 'AE',
		},
		{
			country: 'United Kingdom of Great Britain and Northern Ireland',
			code: 'GB',
		},
		{
			country: 'United States of America',
			code: 'US',
		},
		{
			country: 'Uruguay',
			code: 'UY',
		},
		{
			country: 'Uzbekistan',
			code: 'UZ',
		},
		{
			country: 'Vanuatu',
			code: 'VU',
		},
		{
			country: 'Venezuela',
			code: 'VE',
		},
		{
			country: 'Vietnam',
			code: 'VN',
		},
		{
			country: 'Zambia',
			code: 'ZM',
		},
		{
			country: 'Zimbabwe',
			code: 'ZW',
		},
	];
	constructor(
		private spotifyService: SpotifyService,
		private playlistService: PlaylistsService
	) {}
	ngOnInit(): void {
		this.spotifyService
			.getNewReleases()
			.pipe(
				tap((response) => {
					this.countries_choices
						.find((item) => {
							let responseHref = response.albums.href;
							return (
								item.nativeElement.value ==
								responseHref.substring(
									responseHref.indexOf('country=') + 8,
									responseHref.indexOf('country=') + 10
								)
							);
						})
						?.nativeElement?.setAttribute('selected', 'true');
				})
			)
			.subscribe((response) => {
				this.ITEMS_TO_SHOW.push({
					albums: response.albums,
					tracks: response.tracks,
				});
			});
	}
	@ViewChildren('album_card') album_cards!: QueryList<ElementRef>;
	@ViewChildren('playlist_card') playlist_cards!: QueryList<ElementRef>;
	@ViewChildren('countries') countries_choices!: QueryList<ElementRef>;
	@ViewChild('country_selector') countrySelector!: HTMLSelectElement;
	ngAfterViewInit(): void {}
	header = 'New releases for: ';
	faPlus = faPlus;
	toggleCard(element: HTMLDivElement) {
		element.querySelector('input')!.toggleAttribute('checked');
		if (element.querySelector('input')!.hasAttribute('checked')) {
			element.style.backgroundColor = '#198754';
			element.style.color = '#fff';
			element.style.borderColor = '#198754';
		} else {
			element.style.backgroundColor = '';
			element.style.color = '';
			element.style.borderColor = '';
		}
	}
	hoverOnCard(event: Event) {
		// TODO: Scale animation
	}
	addToPlaylists() {
		let picked_albums_cards = this.album_cards.filter((element) => {
			return element.nativeElement.querySelector('input').checked;
		});
		let picked_albums_subs = picked_albums_cards
			.map((element) => {
				return element.nativeElement.querySelector('input').id;
			})
			.flatMap((id) => {
				return this.spotifyService.getAlbum(id);
			});
		let picked_playlists_cards = this.playlist_cards.filter((element) => {
			return element.nativeElement.querySelector('input').checked;
		});
		let picked_playlists_id = picked_playlists_cards.map((element) => {
			return element.nativeElement.querySelector('input').id;
		});
		if (picked_albums_subs.length != 0) {
			forkJoin(picked_albums_subs)
				.pipe(
					tap((response) => {
						if (this.newPlaylistName.value && this.newPlaylistName.valid) {
							this.playlistService
								.newPlaylist({
									date_created: new Date(),
									image:
										response[Math.floor(Math.random() * response.length)]
											.images[0].url,
									albums: response,
									name: this.newPlaylistName.value,
								})
								.subscribe((response) => {
									this.newPlaylistName.setValue(null);
									this.savedPlaylists.splice(0, 0, response);
								});
						}
						if (picked_playlists_id.length != 0) {
							forkJoin(
								picked_playlists_id.map((picked_playlist_id) => {
									return this.playlistService.addToPlaylist(
										picked_playlist_id,
										response
									);
								})
							).subscribe(() => {
								picked_playlists_cards.forEach((playlist_card) => {
									this.toggleCard(playlist_card.nativeElement);
								});
							});
						} else if (
							picked_playlists_id.length != 0 &&
							!(this.newPlaylistName.value && this.newPlaylistName.valid)
						) {
							console.warn('no playlists selected');
						}
					})
				)
				.subscribe();
		} else {
			console.warn('no albums selected');
		}
	}
	invokeSearch(q: string) {
		if (q != '') {
			this.spotifyService
				.search({
					q,
					type: 'album',
				})
				.subscribe((response) => {
					this.ITEMS_TO_SHOW.splice(0, 0, response);
					this.header = 'Search results for: ';
				});
		} else {
			this.spotifyService.getNewReleases().subscribe((response) => {
				this.ITEMS_TO_SHOW.splice(0, 0, response);
				this.header = 'New releases for:';
			});
		}
	}
	@HostListener('window:scroll', ['$event'])
	onScroll() {
		let pos =
			(document.documentElement.scrollTop || document.body.scrollTop) +
			document.documentElement.offsetTop;
		let max = document.documentElement.scrollHeight;
		if (parseFloat((pos / max).toFixed(2)) >= 0.75) {
			// TODO: load more content when the user gets to the end of the page
		}
	}
	getSavedPlaylists() {
		this.playlistService.getPlaylists().subscribe((response) => {
			this.savedPlaylists = response;
			console.log(this.savedPlaylists);
		});
	}
	changeCountryNewReleases(selectElement: HTMLSelectElement) {
		this.spotifyService
			.getNewReleases({ country: selectElement.value, limit: 20 })
			.subscribe((response) => {
				this.ITEMS_TO_SHOW.splice(0, 0, {
					albums: response.albums,
					tracks: response.tracks,
				});
			});
	}
}
