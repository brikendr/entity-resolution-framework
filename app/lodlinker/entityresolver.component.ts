import { Component, Input, OnInit }         from '@angular/core';
import {LODLinkerService} from "./lodlinker.service";

@Component({
  moduleId: module.id,
  selector: 'entity-resolver',
  templateUrl: "entityresolver.component.html",
  providers: [LODLinkerService],
  styles: [`
  .panel-default {
    border: 1px solid black;
  }
  `]
})

export class EntityResolverComponent implements OnInit {
  @Input() annotatedEntities: JSON;

  ngOnInit(): void {
    console.log('INSIDE ENTITYRESOLVER COMPONENT');
    console.log(this.annotatedEntities);
  }
}
