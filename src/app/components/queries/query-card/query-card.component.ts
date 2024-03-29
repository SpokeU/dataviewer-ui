import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Connection, ConnectionType } from 'src/app/models/connection.model';
import { Query, QueryResult, RunQueryRequest } from 'src/app/models/query.model';
import { ApiError } from 'src/app/modules/shared/models/http.models';
import { FormlyService } from 'src/app/modules/shared/service/formly.service';
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

  queryResult: QueryResult;
  queryError: ApiError;

  queryForm: FormGroup;

  //Formly for queryParameters
  queryParametersForm = this.fb.group({})
  model = {};
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {};

  //UX
  dirty = false;
  loaded = false;
  queryInProggress = false

  placeholderRegex = /\$\{([a-zA-Z0-9_]+)\}/g;

  constructor(private connectionService: ConnectionService, private queryService: QueryService, private fb: FormBuilder, private formlyService: FormlyService) { }

  ngOnInit(): void {
    this.connections$ = this.connectionService.getConnections();
    this.queryForm = this.fb.group(this.originalQuery)

    this.queryForm.valueChanges.subscribe(val => this.dirty = this.formChanged())

    const queryStringInput = this.queryForm.get('queryString');

    queryStringInput.valueChanges.subscribe(val => this.initQueryParametersForm(val))
    this.initQueryParametersForm(queryStringInput.value)

    
  }

  onSubmit() {
    this.saveQuery();
  }

  saveQuery() {
    this.queryService.updateQuery(this.queryForm.value);
  }

  deleteQuery() {
    this.queryService.deleteQuery(this.originalQuery.id);
  }

  runQuery() {
    this.queryInProggress = true;
    this.queryError = null;
    this.queryResult = null;

    const runQueryRequest: RunQueryRequest = {
      connectionId: this.getFormValue('connectionId'),
      queryString: this.getFormValue('queryString'),
      queryParams: this.queryParametersForm.value
    }

    this.queryService.runQuery(runQueryRequest).pipe(delay(500)).subscribe(result => {
      this.queryResult = result;
      
    },
    error => {
      this.queryError = error.error;
    },
    ).add(() => {
      this.queryInProggress = false;
    });
  }

  resetForm() {
    this.queryForm.setValue(this.originalQuery);
  }

  ngAfterViewInit() {
    setTimeout(() => { this.loaded = true }, 10)
  }

  private initQueryParametersForm(query: string) {
    this.fields = this.getPlaceholders(query)
      .map(p => this.formlyService.createFormlyFieldConfig({ key: p, type: "text", className: "query-paratemer-input" }))
  }

  private formChanged() {
    return JSON.stringify(this.originalQuery) !== JSON.stringify(this.queryForm.value)
  }

  private getPlaceholders(text: string) {
    var matches, output = [];

    while (matches = this.placeholderRegex.exec(text)) {
      output.push(matches[1]);
    }

    return output;

  }

  private getFormValue(formControlName: string) {
    return this.queryForm.get(formControlName).value;
  }


}
