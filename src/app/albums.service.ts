import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from './model/album';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  serverUrl = 'http://localhost:3000/albums';

  constructor(private http: HttpClient) { }

  getAlbums(name: string, page: number): Observable<Array<Album>> {
    const finalUrl = `${this.serverUrl}?q=${name}&page=${page}`;
    return this.http.get<Array<Album>>(finalUrl);
  }
}
