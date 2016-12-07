import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { DashboardComponent }         from './dashboard.component';
import { HeroesComponent }            from './heroes.component';
import { HeroDetailComponent }        from './hero-detail.component';
import { TextExtractorComponent }     from './textextractor/text-extractor.component'
import {LODLinkerComponent}           from "./lodlinker/lodlinker.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'textContent/:extractionmethod',     component: TextExtractorComponent },
  { path: 'textContent/:extractionmethod',     component: TextExtractorComponent },
  { path: 'lodlinker',     component: LODLinkerComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
