import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection, ConnectionParameter } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  public getConnectionParameters(type: string): Observable<ConnectionParameter[]> {
    return this.http.get<ConnectionParameter[]>(`assets/mock-responses/connection-parameters-${type.toLowerCase()}.json`);
  }

  public getConnectionTypes(): Observable<string[]> {
    return this.http.get<string[]>('assets/mock-responses/connection-types.json');
  }

  public getConnections(): Observable<Connection[]> {
    return this.http.get<Connection[]>('assets/mock-responses/connections.json');
  }
}
