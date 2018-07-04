export interface GqlIntrospectionDataSet {
  data: Data;
}

export interface Data {
  __schema: Schema;
}

export interface Schema {
  queryType: QueryType;
  mutationType?: any;
  subscriptionType?: any;
  types: Type[];
  directives: Directive[];
}

export interface QueryType {
  name: string;
}

export interface Directive {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
}

export interface Arg {
  name: string;
  description: string;
  type: OfType;
  defaultValue?: string;
}

export interface OfType {
  kind: string;
  name?: string;
  ofType?: OfType;
}

export interface Field {
  name: string;
  description: string;
  args: Arg[];
  type: OfType;
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: any;
}

export interface Type {
  kind: string;
  name: string;
  description: string;
  fields?: Field[];
  inputFields?: any;
  interfaces?: any[];
  enumValues?: EnumValue[];
  possibleTypes?: any;
}
