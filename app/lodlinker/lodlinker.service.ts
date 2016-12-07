import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LODLinkerService {
  private DBPediaAPI:       string = "";
  private GoogleKG:         string = "";
  private GeolocationAPI:   string = "";
  private FOAFAPI:          string = "";

  constructor(private http: Http) {}


}
