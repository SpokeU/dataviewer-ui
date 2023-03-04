import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { QueryResult } from 'src/app/models/query.model';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss']
})
export class QueryResultComponent implements OnInit {

  @Input()
  queryResult: QueryResult;

  displayedColumns: string[];
  dataSource: any[];
  message: string;

  constructor() { }

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges) {
    this.message = null;
    if (changes.queryResult.currentValue) {
      this.initTable(changes.queryResult.currentValue);
    }
  }

  private initTable(queryResult: QueryResult) {
    if (queryResult.result.length !== 0) {
      this.dataSource = queryResult.result;
      this.displayedColumns = Object.getOwnPropertyNames(queryResult.result[0]);
    } else {
      this.message = "Query didn't return any results"
    }
  }

}
