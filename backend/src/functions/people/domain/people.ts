import { v4 as uuidv4 } from 'uuid';

export interface PeopleFieldsRequired {
  readonly name : string;
  readonly height : string;
  readonly mass : string;
  readonly hair_color : string;
  readonly birth_year: string;
  readonly skin_color: string;
  readonly eye_color: string;
  readonly gender: string;
  readonly homeworld: string;
  readonly films: Array<string>;
  readonly species: Array<string>;
  readonly vehicles: Array<string>;
  readonly starships: Array<string>;
  readonly url: string;
}

export interface PeopleFieldsOptional {
  readonly id: string;
  readonly created: Date | string;
  readonly edited: Date;
}


export type PeopleProperties = PeopleFieldsRequired & Partial<PeopleFieldsOptional>;
export type PeoplePropertiesUpd = Partial<PeopleFieldsRequired> & Partial<PeopleFieldsOptional>;


export class People {
  private readonly id : string;
  private name : string;
  private height : string;
  private mass : string;
  private hair_color : string;
  private skin_color : string;
  private birth_year: string;
  private eye_color: string;
  private gender: string;
  private homeworld: string;
  private films: string[];
  private species: Array<string>;
  private vehicles: Array<string>;
  private starships: Array<string>;
  private readonly created: Date | string;
  private edited: Date | null;
  private url: string;

  constructor(properties: PeopleProperties) {
    this.id = uuidv4();
    this.created = new Date().toISOString();
    Object.assign(this, properties);
   
  }

  properties(): PeopleProperties {
    return {
      id: this.id,
      name: this.name,
      height: this.height,
      mass: this.mass,
      hair_color: this.hair_color,
      skin_color: this.skin_color,
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

  update(properties : PeoplePropertiesUpd) {
    /* const fieldsFiltered = Object.fromEntries(
      Object.entries(properties).filter(([_, v]) => v !== null),
    );
    Object.assign(this, fieldsFiltered); */
    this.edited = new Date();
    Object.assign(this, properties);
  }
}
