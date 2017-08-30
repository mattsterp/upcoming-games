import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  headers = new Headers({'X-Mashape-Key': 'zrb3X3OTYXmshypugXno77cYCTPSp1OsdJrjsnBtlG7BO73RlT'});
  options = new RequestOptions({ headers: this.headers });
  limit:number = 50;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getGames(genre, offset_num) {

    let genre_id = genre;
    let offset = offset_num;

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
      .map(response => response.json());

  }

  getFavorites(favs) {

    let favorites = favs;
    favorites = favorites.join();

    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+favorites+'?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]', this.options)
      .map(response => response.json());
}

}