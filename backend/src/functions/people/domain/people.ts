import { v4 as uuidv4 } from 'uuid';

export interface PeopleFieldsRequired {
  readonly name : string;
  readonly height : string;
  readonly mass : string;
  readonly hair_color : string;
  readonly birth_year: string;
  readonly eye_color: string;
  readonly gender: string;
  readonly homeworld: string;
  readonly films: Array<string>;
  readonly species: Array<string>;
  readonly vehicles: Array<string>;
  readonly starships: Array<string>;
  readonly created: Date;
  readonly edited: Date;
  readonly url: string;
}

export interface PeopleFieldsOptional {
  readonly id: string;
  readonly created: Date;
  readonly edited: Date;
}


export type PeopleProperties = PeopleFieldsRequired & Partial<PeopleFieldsOptional>;


export class People {
  readonly id : string;
  readonly name : string;
  readonly height : string;
  readonly mass : string;
  readonly hair_color : string;
  readonly birth_year: string;
  readonly eye_color: string;
  readonly gender: string;
  readonly homeworld: string;
  readonly films: Array<string>;
  readonly species: Array<string>;
  readonly vehicles: Array<string>;
  readonly starships: Array<string>;
  readonly created: Date;
  readonly edited: Date;
  readonly url: string;

  constructor(properties: PeopleProperties) {
    this.id = uuidv4();
    Object.assign(this, properties);
   
  }

  properties(): PeopleProperties {
    return {
      id: this.id,
      name: this.name,
      height: this.height,
      mass: this.mass,
      hair_color: this.hair_color,
      birth_year: this.birth_year,
      eye_color: this.eye_color,
      gender: this.gender,
      homeworld: this.homeworld,
      films: this.films,
      species: this.species,
      vehicles: this.vehicles,
      starships: this.starships,
      created: this.created,
      edited: this.edited,
      url: this.url
    };

  }
}
