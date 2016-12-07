import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import {Http, Headers} from '@angular/http';

import {Hero} from "./hero";
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: "heroes.component.html",
  styleUrls: ['heroes.component.css']
})

export class HeroesComponent implements OnInit {
  //Public property
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService,
    private http: Http) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroAPI()
      .subscribe(heroes => this.heroes = heroes, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });

  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
