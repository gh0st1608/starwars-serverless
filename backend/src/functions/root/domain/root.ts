export interface RootFieldsRequired {
  readonly films : string;
  readonly people : string;
  readonly planets : string;
  readonly species : string;
  readonly starships : string;
  readonly vehicles : string;
}

export type RootPropiertes = Required<RootFieldsRequired>;

export class Root {
  private films : string;
  private people : string;
  private planets : string;
  private species : string;
  private starships : string;
  private vehicles : string;
  
  constructor(properties: RootPropiertes) {
    Object.assign(this, properties);
  }

  properties(): RootPropiertes {
    return {
      films: this.films,
      people: this.people,
      planets: this.planets,
      species: this.species,
      starships: this.starships,
      vehicles: this.vehicles,
    };
  }
}
