import { FindList } from "../core/interfaces";
import { People } from "../domain/people";
import { PeopleRepository } from "../domain/repositories/people.repository";
import { DynamoDBRepository } from "../infrastructure/dynamodb.infrastructure";
import { Result } from 'neverthrow';

export class PeopleApplication {
  constructor(private peopleRepository: PeopleRepository, private dynamoDBRepository : DynamoDBRepository) {}

  async get() : Promise<Result<FindList<People>,Error>> {
    return this.peopleRepository.get();
  }

  async getOne(id : string) : Promise<Result<People,Error>> {
    const itemFind = await this.dynamoDBRepository.getItem(id)
    if(itemFind.isOk()) return itemFind
    return this.peopleRepository.getOne(id);
    
  }

  async getSchema() {
    return this.peopleRepository.getSchema();
  }

  async create(people: People) : Promise<void> {
    await this.dynamoDBRepository.createItem(people)
  }
}