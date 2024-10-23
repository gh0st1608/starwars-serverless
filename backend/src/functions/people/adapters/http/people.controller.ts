import { PeopleApplication } from "../../application/people.application";
import { FindList } from "../../core/interfaces";
import { People } from "../../domain/people";
import { Result } from 'neverthrow';

export class PeopleController {
  constructor(private peopleApplication: PeopleApplication) {}

  async get() : Promise<Result<FindList<People>,Error>> {
    return this.peopleApplication.get();
  }

  async getOne(id : string) : Promise<Result<People,Error>> {
    return this.peopleApplication.getOne(id)
  }

  async getSchema() {
    return this.peopleApplication.getSchema();
  }

  async create(people : People) : Promise<void> {
    return this.peopleApplication.create(people);
  }
}
