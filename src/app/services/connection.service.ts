import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Connection, ConnectionParameter } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionsState = new BehaviorSubject<Connection[]>([]);

  private connection$: Observable<Connection[]>

  constructor(private http: HttpClient) {
    this.connection$ = this.connectionsState.asObservable();
    this.fetchConnectionsFromServer();
  }

  private get connections(): Connection[] {
    return this.connectionsState.getValue();
  }

  public getConnectionParameters(type: string): Observable<ConnectionParameter[]> {
    return this.http.get<ConnectionParameter[]>(`assets/mock-responses/connection-parameters-${type.toLowerCase()}.json`);
  }

  public getConnectionTypes(): Observable<string[]> {
    return this.http.get<string[]>('assets/mock-responses/connection-types.json');
  }

  public getConnections(): Observable<Connection[]> {
    return this.connection$;
  }

  public addConnection(connection: Connection): void {
    this.connectionsState.next([...this.connections, connection]);

    /* this.http.post<Connection>('/connections', connection).subscribe(connectionResponse => {
      this.connectionsState$.next([...this.connections, connectionResponse]);
    }) */
  }

  public updateConnection(connection: Connection): void {
    this.updateConnectionState(connection);
  }

  private fetchConnectionsFromServer() {
    this.http.get<Connection[]>('assets/mock-responses/connections.json')
      .subscribe(connections => this.connectionsState.next(connections));
  }

  public deleteConnection(id: number) {
    const existingConnectionIndex = this.connections.findIndex(connectionItem => connectionItem.id === id);
    const updatedState = [...this.connections]
    updatedState.splice(existingConnectionIndex, 1);
    this.connectionsState.next(updatedState);
  }

  private updateConnectionState(connection: Connection) {
    const existingConnectionIndex = this.connections.findIndex(connectionItem => connectionItem.id === connection.id);
    const updatedState = [...this.connections]
    updatedState.splice(existingConnectionIndex, 1, connection);
    this.connectionsState.next(updatedState);
  }

}
