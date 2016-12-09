import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import {Http, Headers}                      from '@angular/http';
import {LODLinkerService} from "./lodlinker.service";
import 'rxjs/add/operator/switchMap';
import {EntityResolverComponent} from "./entityresolver.component";

@Component({
  moduleId: module.id,
  selector: 'lod-linker',
  templateUrl: "lodlinker.component.html",
  providers: [LODLinkerService],
  entryComponents: [EntityResolverComponent],
  styleUrls: ["lodlinker.component.css"]
})

export class LODLinkerComponent implements OnInit {

  @Input() childEntities: JSON;
  private areEntitiesAnnotated: boolean = false;
  private annotatedEntities: JSON;
  private organizations: string;
  private locations: string;
  private persons: string;

  constructor(
    private router: Router,
    private http: Http,
    private lodLinkerService: LODLinkerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Entities on init');
    console.log(this.childEntities);
    // Init Organizations
    //this.organizations = this.childEntities.stringify("Organization");
  }

  resolveEntities(entity: string): void{
    console.log('CALLING GOOGLE KNOWLEGE API');

    this.lodLinkerService.googleKnowledgeGraphAPI(entity)
      .subscribe(annotatedEntities => this.assignAnnotatedEntities(annotatedEntities),
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  assignAnnotatedEntities(data: JSON):void {
    this.annotatedEntities = data;
    this.areEntitiesAnnotated = true;
  }

}
