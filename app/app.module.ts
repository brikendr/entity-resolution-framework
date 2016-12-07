import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import { HeroDetailComponent}   from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { HeroService }          from './hero.service';
import {DashboardComponent} from "./dashboard.component";

import { AppRoutingModule }     from './app-routing.module';
import {TextExtractorComponent} from "./textextractor/text-extractor.component";
import {LODLinkerComponent} from "./lodlinker/lodlinker.component";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    TextExtractorComponent,
    LODLinkerComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap:    [
    AppComponent
  ]
})
export class AppModule { }
