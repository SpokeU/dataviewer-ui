import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Connection } from 'src/app/models/connection.model';
import { ConnectionInput } from 'src/app/modules/shared/models/simple-modal.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { CreateConnectionComponent } from '../create-connection/create-connection.component';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss']
})
export class ConnectionCardComponent implements OnInit {

  @Input()
  connection: Connection;

  constructor(private modalService: SimpleModalService, private connectionService: ConnectionService) { }

  ngOnInit(): void {
    console.log("Card intit for:" + this.connection.name)
  }

  openEditConnectionModal() {
    this.modalService.addModal(CreateConnectionComponent, { connection: this.connection } as ConnectionInput);
  }

  deleteConnection() {
    this.connectionService.deleteConnection(this.connection.id);
  }

}
