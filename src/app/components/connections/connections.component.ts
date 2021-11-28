import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { CreateConnectionComponent } from './create-connection/create-connection.component';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  constructor(private simpleModalService: SimpleModalService) { }

  ngOnInit(): void {
  }

  openCreationForm() {
    this.simpleModalService.addModal(CreateConnectionComponent, undefined, { closeOnClickOutside: true })
  }

}
