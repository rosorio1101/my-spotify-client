import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AlbumsService } from './albums.service';
import { Album } from './model/album';
import { Subscription, Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spotify Album Searcher';
  albums: Array<Album>;
  page: number;
  albumSearch: string;

  constructor(private service: AlbumsService) { }

  onSearch(albumName: string) {
    if (this.albumSearch && albumName !== this.albumSearch) {
      this.albums = [];
    }

    this.albumSearch = albumName;
    if (!this.page) {
      this.page = 1;
    } else {
      this.page++;
    }  
      
    this.service.getAlbums(this.albumSearch, this.page).subscribe((data: Array<Album>) => {
      console.log(`data ${data}`);
      if (!this.albums) {
        this.albums = data;
      } else {
        this.albums = this.albums.concat(data);
      }
      console.log(`albums ${this.albums}`);
    });
  }
  onScroll() {
    if (this.albumSearch) {
      this.onSearch(this.albumSearch);
    }
  }
}
