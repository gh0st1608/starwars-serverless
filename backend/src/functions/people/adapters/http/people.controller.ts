import { PeopleApplication } from "../../application/people.application";
import { FindList } from "../../core/interfaces";
import { People } from "../../domain/people";

export class PeopleController {
  constructor(private peopleApplication: PeopleApplication) {}

  async get() : Promise<FindList<People>> {
    return await this.peopleApplication.get();
  }

  async getOne(id : string) {
    return await this.peopleApplication.getOne(id);
  }

  async getSchema() {
    return await this.peopleApplication.getSchema();
  }

  async create(people : People) : Promise<void> {
    const item = new People(people)
    return await this.peopleApplication.create(item);
  }
}
