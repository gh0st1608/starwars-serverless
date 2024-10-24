import { Root } from "../root";
import { Result } from "neverthrow";

export interface RootRepository {
  get(): Promise<Result<Root,Error>>;
}
