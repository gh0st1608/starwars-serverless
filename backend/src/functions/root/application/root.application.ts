import { Root } from "../domain/root";
import { RootRepository } from "../domain/repositories/root.repository";

export class RootApplication {
  constructor(private rootRepository: RootRepository) {}

  async get() : Promise<Root> {
    return this.rootRepository.get();
  }
}