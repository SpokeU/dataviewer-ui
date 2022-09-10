import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Query, QueryResult, RunQueryRequest } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  url: string

  private queriesState = new BehaviorSubject<Query[]>([]);

  private queryObservable$: Observable<Query[]>

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/queries';
    this.queryObservable$ = this.queriesState.asObservable();

    this.http.get<Query[]>(this.url)
      .subscribe(queries => this.queriesState.next(queries));
  }

  public runQuery(runQueryRequest: RunQueryRequest): Observable<QueryResult> {
    return this.http.post<QueryResult>(`${this.url}/run`, runQueryRequest);
  }

  public addQuery(query: Query) {
    this.http.post<Query>(this.url, query).subscribe(queryResponse => {
      this.queriesState.next([queryResponse, ...this.queries])
    })
  }

  public getQueries(): Observable<Query[]> {
    return this.queryObservable$;
  }

  public updateQuery(query: Query) {
    this.http.put<Query>(`${this.url}/${query.id}`, query).subscribe(queryResponse => this.updateQueryState(queryResponse));
  }

  public updateQueryState(query: Query) {
    const existingConnectionIndex = this.queries.findIndex(queryItem => queryItem.id === query.id);
    const updatedState = [...this.queries]
    updatedState.splice(existingConnectionIndex, 1, query);
    this.queriesState.next(updatedState);
  }

  public deleteQuery(id: Number) {
    this.http.delete(`${this.url}/${id}`).subscribe(resp => {
      const existingConnectionIndex = this.queries.findIndex(query => query.id === id);
      const updatedState = [...this.queries]
      updatedState.splice(existingConnectionIndex, 1);
      this.queriesState.next(updatedState);
    })
  }

  private get queries() {
    return this.queriesState.value;
  }
}
