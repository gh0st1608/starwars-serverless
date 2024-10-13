import { People } from "../domain/people";
import { FindList } from "../core/interfaces";
import { AxiosSingleton } from "../core/providers"
import { Parameters } from "../core/parameters/index"
import { PeopleRepository } from "../domain/repositories/people.repository";

export class PeopleInfrastructure implements PeopleRepository {
  async get(): Promise<FindList<People>> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/people'); // Cambia el endpoint según sea necesario
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }
  async getOne(id : string): Promise<People> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get(`/people/${id}`); // Cambia el endpoint según sea necesario
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }
  async getSchema(): Promise<any> {
    AxiosSingleton.initialize(Parameters.apiStarWars.url, 1000);
    const axiosInstance = AxiosSingleton.getInstance();
    try {
        const response = await axiosInstance.get('/people/schema'); // Cambia el endpoint según sea necesario
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
