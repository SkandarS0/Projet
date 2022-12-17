import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListPlaylists } from './playlists/list.component';
import { ListNewReleases } from './releases/releases.component';

const routes: Routes = [
	{
		path: 'playlists',
		component: ListPlaylists,
	},
	{
		path: '',
		component: ListNewReleases,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
