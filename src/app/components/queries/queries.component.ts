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
    this.queries$ = this.queryService.getQueries();
  }

  createQuery() {
    const query: Query = {
      id: 3,
      name: "New query",
      queryString: "SELECT * FROM {}",
      connectionId: null
    }

    this.queryService.addQuery(query);
  }

}
