import { Root } from "../root";

export interface RootRepository {
  get(): Promise<Root>;
}
