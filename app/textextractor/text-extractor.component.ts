import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import {Http, Headers}                      from '@angular/http';
import { Location }                         from '@angular/common';

import { TextExtractorService }             from './text-extractor.service';
import 'rxjs/add/operator/switchMap';
import {LODLinkerComponent} from "../lodlinker/lodlinker.component";
import {EntityResolverComponent} from "../lodlinker/entityresolver.component";

@Component({
  moduleId: module.id,
  selector: 'url-text-extractor',
  templateUrl: "text-extractor.component.html",
  entryComponents: [LODLinkerComponent],
  providers: [TextExtractorService]
})

export class TextExtractorComponent implements OnInit {
  //Public property
  @Input() apiExtractor: boolean;
  textContent: string = "Microsoft, Apple and Nike were founded by Bill Gates, Steve Jobs and Bill Bowerman. The headquarters are in California, Los Angeles and New York.";
  url: string = "http://localhost:3000/example";
  entities: JSON;
  extractedEntities: boolean = false;
  componentTitle: string = "Text Extraction API - Step 1";

  constructor(
    private router: Router,
    private extractorService: TextExtractorService,
    private http: Http,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.route
      .params
      .subscribe(params => {
        // Get the extraction method value from the URL
        this.apiExtractor = params['extractionmethod'] === "manual" ? false:true;
      });
  }

  extractText(): void {
    if(this.apiExtractor) {
      this.getTextFromURL();
    } else {
      this.getEntities();
    }
  }

  getEntities(): void {
    this.extractorService.extractEntitiesAPI(this.textContent)
      .subscribe(entities => this.navigateToLODComponent(entities),
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  navigateToLODComponent(data: JSON):void {
    this.entities = data;
    this.extractedEntities = true;
    window.location.hash = 'whatis';
  }

  getTextFromURL(): void {
    this.extractorService.extractTextAPI(this.url)
      .subscribe(textData => this.performEntityExtraction(textData),
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  performEntityExtraction(data: string): void {
    console.log('THE TEXT AFTER EXTRACTING THROUGH BOILERPIPE');
    console.log(data);
    this.textContent = data;
    this.getEntities();
  }

  goBack(): void {
    this.location.back();
  }

}
