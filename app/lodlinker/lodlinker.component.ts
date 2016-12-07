import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import {Http, Headers}                      from '@angular/http';
import { Location }                         from '@angular/common';
import {LODLinkerService} from "./lodlinker.service";
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'lod-linker',
  templateUrl: "lodlinker.component.html",
  providers: [LODLinkerService],
  styleUrls: ["lodlinker.component.css"]
})

export class LODLinkerComponent implements OnInit {

  @Input() childEntities: JSON;
  private organizations: string;
  private locations: string;
  private persons: string;

  constructor(
    private router: Router,
    private http: Http,
    private lodLinkerService: LODLinkerService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    console.log('Entities on init');
    console.log(this.childEntities);
    // Init Organizations
    //this.organizations = this.childEntities.stringify("Organization");
  }

  goBack(): void {
    this.location.back();
  }


}
