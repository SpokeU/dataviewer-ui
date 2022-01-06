import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Query, QueryResult } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private queriesState = new BehaviorSubject<Query[]>([]);

  private queryObservable$: Observable<Query[]>

  constructor(private http: HttpClient) {
    this.queryObservable$ = this.queriesState.asObservable();

    this.http.get<Query[]>('assets/mock-responses/query/queries.json')
      .subscribe(queries => this.queriesState.next(queries));
  }

  public executeQuery() {
    return this.http.get<QueryResult>('assets/mock-responses/query/query-result.json')
  }

  public addQuery(query: Query) {
    this.queriesState.next([query, ...this.queries])
  }

  public getQueries(): Observable<Query[]> {
    return this.queryObservable$;
  }

  public updateQuery(query: Query) {
    const existingConnectionIndex = this.queries.findIndex(queryItem => queryItem.id === query.id);
    const updatedState = [...this.queries]
    updatedState.splice(existingConnectionIndex, 1, query);
    this.queriesState.next(updatedState);
  }

  public deleteQuery(id: Number) {
    const existingConnectionIndex = this.queries.findIndex(query => query.id === id);
    const updatedState = [...this.queries]
    updatedState.splice(existingConnectionIndex, 1);
    this.queriesState.next(updatedState);
  }

  private get queries() {
    return this.queriesState.value;
  }
}
