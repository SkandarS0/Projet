import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ListPlaylists } from './playlists/list.component';
import { ListNewReleases } from './releases/releases.component';

@NgModule({
	declarations: [AppComponent, ListPlaylists, ListNewReleases],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FontAwesomeModule,
		ReactiveFormsModule,
	],
	providers: [CookieService],
	bootstrap: [AppComponent],
})
export class AppModule {}
