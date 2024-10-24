import { RootApplication } from "../../application/root.application";
import { Root } from "../../domain/root";
import { Result } from "neverthrow";

export class RootController {
  constructor(private rootApplication: RootApplication) {}

  async get() : Promise<Result<Root,Error>> {
    return this.rootApplication.get();
  }
}
