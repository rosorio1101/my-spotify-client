import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AlbumsService } from './albums.service';
import { Album } from './model/album';
import { Subscription, Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Spotify Album Searcher';
  albums: Array<Album>;
  @Input('searchField') searchField: Observable<string>;

  constructor(private service: AlbumsService) { }

  ngOnChanges(changes) {
    if (this.searchField) {
      this.searchField.subscribe((searchData: string) => {
        console.log(searchData);
      });
    }
  }
  onSearch(albumName) {
    console.log(albumName);
    this.service.getAlbums(albumName, 1).subscribe((data: Array<Album>) => {
      this.albums = data;
    });
  }
}
