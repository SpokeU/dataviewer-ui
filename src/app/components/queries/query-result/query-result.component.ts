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

  constructor() { }

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.queryResult.currentValue) {
      this.initTable(changes.queryResult.currentValue);
    }
  }

  private initTable(queryResult: QueryResult) {
    this.dataSource = queryResult.result;
    this.displayedColumns = Object.getOwnPropertyNames(queryResult.result[0]);
  }

}
