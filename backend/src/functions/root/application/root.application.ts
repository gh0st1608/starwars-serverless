import { Root } from "../domain/root";
import { RootRepository } from "../domain/repositories/root.repository";
import { Result } from 'neverthrow'

export class RootApplication {
  constructor(private rootRepository: RootRepository) {}

  async get() : Promise<Result<Root,Error>> {
    return this.rootRepository.get();
  }
}