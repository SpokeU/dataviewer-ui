import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from 'src/app/models/query.model';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  queries$: Observable<Query[]>;

  constructor(private queryService: QueryService) { }

  ngOnInit(): void {
    this.queryService.refreshData();
    this.queries$ = this.queryService.getQueries();
  }

  createQuery() {
    const query: Query = {
      name: "New query",
      queryString: "SELECT * FROM {}"
    }

    this.queryService.addQuery(query);
  }

}
