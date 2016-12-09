import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//CONSTANTS
const GOOGLEKEY: string = "AIzaSyDjac_LonCtW2e8XSopGuLLA8TAXkCeV7Y";

@Injectable()
export class LODLinkerService {
  private DBPediaAPI:       string = "";
  private GoogleKG:         string = "https://kgsearch.googleapis.com/v1/entities:search";
  private GeolocationAPI:   string = "";
  private FOAFAPI:          string = "";

  constructor(private http: Http) {}


  googleKnowledgeGraphAPI(entity: string): Observable<JSON> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('query', entity);
    params.set('key', GOOGLEKEY);
    params.set('limit', "5");
    return this.http.get(this.GoogleKG, {
      search: params
    }).map(this.mapGoogleKnowledgeGraphData)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  mapGoogleKnowledgeGraphData(res: Response) {
    let body = res.json();
    return body.itemListElement || { };
  }
}
