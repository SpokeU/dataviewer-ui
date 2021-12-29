import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Observable } from 'rxjs';
import { Connection } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { CreateConnectionComponent } from './create-connection/create-connection.component';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  connections$!: Observable<Connection[]>;

  constructor(private connectionService: ConnectionService,
    private simpleModalService: SimpleModalService) { }

  ngOnInit(): void {
    this.connections$ = this.connectionService.getConnections();
  }

  openCreationForm() {
    this.simpleModalService.addModal(CreateConnectionComponent)
  }

}
