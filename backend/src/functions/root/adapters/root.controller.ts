import { RootApplication } from "../application/root.application";
import { Root } from "../domain/root";

export class RootController {
  constructor(private rootApplication: RootApplication) {}

  async get() : Promise<Root> {
    return this.rootApplication.get();
  }
}
