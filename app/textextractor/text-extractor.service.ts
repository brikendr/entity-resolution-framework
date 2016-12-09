import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TextExtractorService {
  private boilerPipeAPI = 'http://boilerpipe-web.appspot.com/extract';  // URL to web api
  private stanfordNERAPI = 'http://localhost:3000/api/extractor/tag';  // URL to NER api

  constructor(private http: Http) {}

  extractTextAPI(url: string): Observable<string> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('url', url);
    params.set('output', "text");
    return this.http.get(this.boilerPipeAPI, {
      search: params
    }).map((res:Response) => res.text())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  extractEntitiesAPI(textContent: string): Observable<JSON> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.stanfordNERAPI+"?textContent="+textContent, {})
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('DATA BEFORE PARSING');
    console.log(body);
    return body.entities || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
