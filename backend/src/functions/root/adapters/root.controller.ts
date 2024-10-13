import { RootApplication } from "../application/root.application";
import { Root } from "../domain/root";

export class RootController {
  constructor(private rootApplication: RootApplication) {}

  async get() {
    return await this.rootApplication.get();
  }
}
