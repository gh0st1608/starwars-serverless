import { People } from "../people";
import { FindList } from "../../core/interfaces";

export interface PeopleRepository {
  get(): Promise<FindList<People>>;
  getOne(id : string): Promise<People>;
  getSchema(): Promise<any>;
  create(people : People) : Promise<void>
}
