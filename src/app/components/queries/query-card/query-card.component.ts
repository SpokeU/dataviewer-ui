import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionType } from 'src/app/models/connection.model';
import { Query } from 'src/app/models/query.model';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-query-card',
  templateUrl: './query-card.component.html',
  styleUrls: ['./query-card.component.scss']
})
export class QueryCardComponent implements OnInit {
  
  connectionTypes$: Observable<string[]>

  @Input() query: Query

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.connectionTypes$ = this.connectionService.getConnectionTypes();
  }

}
