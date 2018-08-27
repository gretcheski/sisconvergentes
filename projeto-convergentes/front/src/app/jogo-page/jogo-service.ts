import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse   } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { IJogo } from './IJogo';

@Injectable()
export class JogoService {

    //private url = 'http://localhost:8081/jogo/all';
    //private url_post = 'http://localhost:8081/jogo/add';

    private url = '/api/jogo/all';

    constructor(private http: HttpClient) {    }

    getJogos() {
      return this.http
      .get<IJogo[]>(this.url)
      .pipe(map(data => data),
      catchError(this.errorHandler));
      }

      getJogosAlert(): Observable<IJogo[]> {
        return this.http.get<IJogo[]>(this.url)
                        .pipe(tap(data => alert(JSON.stringify(data))) ,
                        catchError(this.errorHandler));
      }

      errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error.message || "Erro no servidor");
      }

      createJogo(jogo: IJogo): Observable<IJogo> {
        const httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json');
        const options = {
            headers: httpHeaders
        };
        return this.http.post<IJogo>(this.url, jogo, options);
    }

    postJogo(jogo: IJogo): Observable<HttpResponse<IJogo>> {
      const httpHeaders = new HttpHeaders({
           'Content-Type' : 'application/json'
      });
      return this.http.post<IJogo>(this.url, jogo,
          {
            headers: httpHeaders,
            observe: 'response'
          }
      );
  }

}
