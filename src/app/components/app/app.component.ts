import {Component, OnInit} from '@angular/core';
import {GqlService} from '../../services/gql.service';
import {Schema} from '../../models/interfaces';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private gqlSchema: Schema = {};

  constructor(public gqlService: GqlService) {
  }

  ngOnInit() {
    this.gqlService.getGqlStructure('http://localhost:4000/graphql')
      .pipe(
        map((res) => {
          const result = res.data.__schema;
          result.types = result.types
            .filter((type) => type.name.substring(0, 2) !== '__')
          return result;
        })
      )
      .subscribe((res) => this.gqlSchema = res);
  }
}
