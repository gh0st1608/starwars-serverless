import { Root } from "../domain/root";
import { AxiosSingleton } from "../core/providers"
import { Parameters } from "../core/parameters/index"
import { RootRepository } from "../domain/repositories/root.repository";

export class RootInfrastructure implements RootRepository {
  async get(): Promise<Root> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/'); // Cambia el endpoint según sea necesario
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }
}
