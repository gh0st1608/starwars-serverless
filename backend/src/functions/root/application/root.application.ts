import { Root } from "../domain/root";
import { RootRepository } from "../domain/repositories/root.repository";

export class RootApplication {
  constructor(private rootRepository: RootRepository) {}

  async get() {
    return await this.rootRepository.get();
  }
}