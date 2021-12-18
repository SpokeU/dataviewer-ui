import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Connection, ConnectionParameter } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionsState$ = new BehaviorSubject<Connection[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Connection[]>('assets/mock-responses/connections.json')
      .subscribe(connections => this.connectionsState$.next(connections));
  }

  get connections(): Connection[] {
    return this.connectionsState$.getValue();
  }

  public getConnectionParameters(type: string): Observable<ConnectionParameter[]> {
    return this.http.get<ConnectionParameter[]>(`assets/mock-responses/connection-parameters-${type.toLowerCase()}.json`);
  }

  public getConnectionTypes(): Observable<string[]> {
    return this.http.get<string[]>('assets/mock-responses/connection-types.json');
  }

  public getConnections(): Observable<Connection[]> {
    return this.connectionsState$.asObservable();
  }

  public addConnection(connection: Connection): void {
    this.connectionsState$.next([...this.connections, connection]);

    /* this.http.post<Connection>('/connections', connection).subscribe(connectionResponse => {
      this.connectionsState$.next([...this.connections, connectionResponse]);
    }) */
  }
}
