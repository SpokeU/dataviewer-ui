import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Connection, ConnectionType } from 'src/app/models/connection.model';
import { Query } from 'src/app/models/query.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-card',
  templateUrl: './query-card.component.html',
  styleUrls: ['./query-card.component.scss']
})
export class QueryCardComponent implements OnInit {

  @Input('query') originalQuery: Query;

  connections$: Observable<Connection[]>

  queryForm: FormGroup;

  dirty = false;

  constructor(private connectionService: ConnectionService, private queryService: QueryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.connections$ = this.connectionService.getConnections();
    //this.modifiedQuery = Object.assign({}, this.originalQuery);
    this.queryForm = this.fb.group(this.originalQuery)

    this.queryForm.valueChanges.subscribe(val => this.dirty = this.formChanged())
  }

  deleteQuery() {
    this.queryService.deleteQuery(this.originalQuery.id);
  }

  saveQuery() {
    this.queryService.updateQuery(this.originalQuery);
  }

  onSubmit() {
    console.log(this.originalQuery);
    console.log(this.queryForm.value);
  }

  runQuery() {
    console.log(this.originalQuery);
    console.log(this.queryForm.value);
  }

  private formChanged() {
    return JSON.stringify(this.originalQuery) !== JSON.stringify(this.queryForm.value)
  }

  resetForm() {
    this.queryForm.setValue(this.originalQuery);
  }

}
