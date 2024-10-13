export interface RootFieldsRequired {
  readonly resource: Object;
}

export class Resource {
  readonly films : string;
  readonly people : string;
  readonly planets : string;
  readonly species : string;
  readonly starships : string;
  readonly vehicles : string;
}

export type FieldsRequired = Required<Resource>;

export class Root {
  constructor(properties: FieldsRequired) {
    Object.assign(this, properties);
  }
}
