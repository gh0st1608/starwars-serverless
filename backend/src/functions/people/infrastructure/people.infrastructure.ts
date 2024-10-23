import { People } from "../domain/people";
import { FindList } from "../core/interfaces";
import { AxiosSingleton } from "../core/providers"
import { Parameters } from "../core/parameters/index"
import { PeopleRepository } from "../domain/repositories/people.repository";
import { Result, ok, err } from 'neverthrow';

export class PeopleInfrastructure implements PeopleRepository {
  async get(): Promise<Result<FindList<People>,Error>> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/people');
        const findListResponse: FindList<People> = {
          data: response.data.results, // Mapea los resultados
          count: response.data.count   // Obtiene el conteo total
      };
      return ok(findListResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      return err(new Error('Error fetching data'))
    }
  }
  async getOne(id : string): Promise<Result<People,Error>> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get(`/people/${id}`);
        return ok(response.data as People)
    } catch (error) {
      return err(new Error('Error fetching data'))
    }
  }
  async getSchema(): Promise<any> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/people/schema');
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  async create(people : People) : Promise<void> {
    try {
      await this.create(people); 
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  }
}
