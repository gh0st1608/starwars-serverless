import { FindList } from "../core/interfaces";
import { People } from "../domain/people";
import { PeopleRepository } from "../domain/repositories/people.repository";
import { DynamoDBRepository } from "../infrastructure/dynamodb.infrastructure";

export class PeopleApplication {
  constructor(private peopleRepository: PeopleRepository, private dynamoDBRepository : DynamoDBRepository) {}

  async get() : Promise<FindList<People>> {
    return this.peopleRepository.get();
  }

  async getOne(id : string) : Promise<People> {
    const itemFind = await this.dynamoDBRepository.getItem(id)
    if(!itemFind) return this.peopleRepository.getOne(id);
    return itemFind
  }

  async getSchema() {
    return this.peopleRepository.getSchema();
  }

  async create(people: People) : Promise<void> {
    await this.dynamoDBRepository.createItem(people)
  }
}