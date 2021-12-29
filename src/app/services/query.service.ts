import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Query } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  queriesState$ = new BehaviorSubject<Query[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Query[]>('assets/mock-responses/query/queries.json')
      .subscribe(queries => this.queriesState$.next(queries));
  }

  public getQueries(): Observable<Query[]> {
    return this.queriesState$.asObservable();
  }
}
