import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:3000/api/heroes/getHeroes';  // URL to web api

  constructor(private http: Http) {}
  /*
   The consumer of our service doesn't know how the service gets the data.
   Our HeroService could get Hero data from anywhere.
   It could get the data from a web service or local storage or from a mock data source.
   */
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroAPI(): Observable<Hero[]> {
    console.log('calling '+this.heroesUrl);
    return this.http.get(this.heroesUrl)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

}
