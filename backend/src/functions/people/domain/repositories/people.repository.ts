import { People } from "../people";
import { FindList } from "../../core/interfaces";
import { Result } from 'neverthrow';

export interface PeopleRepository {
  get(): Promise<Result<FindList<People>,Error>>;
  getOne(id : string): Promise<Result<People,Error>>;
  getSchema(): Promise<any>;
  create(people : People) : Promise<void>
}
