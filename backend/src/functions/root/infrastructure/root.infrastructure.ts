import { Root } from "../domain/root";
import { AxiosSingleton } from "../core/providers"
import { Parameters } from "../core/parameters/index"
import { RootRepository } from "../domain/repositories/root.repository";
import { err, ok, Result } from 'neverthrow';

export class RootInfrastructure implements RootRepository {
  async get(): Promise<Result<Root,Error>> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/'); // Cambia el endpoint según sea necesario
        const root : Root = {
          ...response.data
        }
        return ok(root)
    } catch (error) {
        console.error('Error fetching data:', error);
        return err(error)
    }
  }
}
