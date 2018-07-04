import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GqlIntrospectionDataSet} from '../models/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GqlService {

  readonly INTROSPECTION_QUERY = '{"operationName":"IntrospectionQuery","variables":{},"query":"query IntrospectionQuery {\\n  __schema {\\n    queryType {\\n      name\\n    }\\n    mutationType {\\n      name\\n    }\\n    subscriptionType {\\n      name\\n    }\\n    types {\\n      ...FullType\\n    }\\n    directives {\\n      name\\n      description\\n      locations\\n      args {\\n        ...InputValue\\n      }\\n    }\\n  }\\n}\\n\\nfragment FullType on __Type {\\n  kind\\n  name\\n  description\\n  fields(includeDeprecated: true) {\\n    name\\n    description\\n    args {\\n      ...InputValue\\n    }\\n    type {\\n      ...TypeRef\\n    }\\n    isDeprecated\\n    deprecationReason\\n  }\\n  inputFields {\\n    ...InputValue\\n  }\\n  interfaces {\\n    ...TypeRef\\n  }\\n  enumValues(includeDeprecated: true) {\\n    name\\n    description\\n    isDeprecated\\n    deprecationReason\\n  }\\n  possibleTypes {\\n    ...TypeRef\\n  }\\n}\\n\\nfragment InputValue on __InputValue {\\n  name\\n  description\\n  type {\\n    ...TypeRef\\n  }\\n  defaultValue\\n}\\n\\nfragment TypeRef on __Type {\\n  kind\\n  name\\n  ofType {\\n    kind\\n    name\\n    ofType {\\n      kind\\n      name\\n      ofType {\\n        kind\\n        name\\n        ofType {\\n          kind\\n          name\\n          ofType {\\n            kind\\n            name\\n            ofType {\\n              kind\\n              name\\n              ofType {\\n                kind\\n                name\\n              }\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\\n}\\n"}';

  constructor(public http: HttpClient) {
  }

  public getGqlStructure(url: string): Observable<GqlIntrospectionDataSet> {
    return this.http.post(url,
      this.INTROSPECTION_QUERY,
      {
        headers: {
          'Content-Type': 'application/json',
          'Pragma': 'no-cache',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,ga;q=0.6',
          'accept': '*/*'
        }
      })
      .pipe(
        map((res) => <GqlIntrospectionDataSet>res)
      );
  }
}
