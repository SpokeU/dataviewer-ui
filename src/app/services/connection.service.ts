import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Connection, ConnectionParameter } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url: string

  private connectionsState = new BehaviorSubject<Connection[]>([]);

  private connection$: Observable<Connection[]>

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/connections';
    this.connection$ = this.connectionsState.asObservable();
    this.fetchConnectionsFromServer();
  }

  private get connections(): Connection[] {
    return this.connectionsState.getValue();
  }

  public getConnectionParameters(type: string): Observable<ConnectionParameter[]> {
    return this.http.get<ConnectionParameter[]>(`${this.url}/${type}/parameters`);
  }

  public getConnectionTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/types`).pipe(take(1));
  }

  public getConnections(): Observable<Connection[]> {
    return this.connection$;
  }

  public addConnection(connection: Connection): void {
    this.http.post<Connection>(this.url, connection).subscribe(connectionResponse => {
      this.connectionsState.next([...this.connections, connectionResponse]);
    }, err => { console.log(err) });
  }

  public updateConnection(connection: Connection): void {
    this.http.put<Connection>(`${this.url}/${connection.id}`, connection).subscribe(connectionResponse => {
      this.updateConnectionState(connectionResponse);
    })

  }

  private fetchConnectionsFromServer() {
    this.http.get<Connection[]>(this.url)
      .subscribe(connections => this.connectionsState.next(connections));
  }

  public deleteConnection(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe(resp => {
      const existingConnectionIndex = this.connections.findIndex(connectionItem => connectionItem.id === id);
      const updatedState = [...this.connections]
      updatedState.splice(existingConnectionIndex, 1);
      this.connectionsState.next(updatedState);
    })
  }

  private updateConnectionState(connection: Connection) {
    const existingConnectionIndex = this.connections.findIndex(connectionItem => connectionItem.id === connection.id);
    const updatedState = [...this.connections]
    updatedState.splice(existingConnectionIndex, 1, connection);
    this.connectionsState.next(updatedState);
  }

}
