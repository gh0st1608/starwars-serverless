import AWS from 'aws-sdk';
import { Parameters } from "../core/parameters";
import { People } from '../domain/people';

export class DynamoDBRepository  {
  static instance: any;
  dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
      if (DynamoDBRepository.instance) {
          return DynamoDBRepository.instance;
      }
      
      this.dynamoDB = new AWS.DynamoDB.DocumentClient({
          endpoint: Parameters.confDynamoDB.host, // URL de LocalStack
          region: Parameters.confAws.region,
      });

      DynamoDBRepository.instance = this;
  }

  async createItem(people : People) {
    const { id, ...item } = people
      const params = {
          TableName: Parameters.confDynamoDB.table, // Cambia por el nombre de tu tabla
          Item: {
            peopleId : id, 
            ...item
          },
      };
      try {
          await this.dynamoDB.put(params).promise();
      } catch (error) {
          throw new Error(`Error al crear el ítem: ${error.message}`);
      }
  }

  async getItem(id : string) {
    const params = {
        TableName: Parameters.confDynamoDB.table, // Cambia por el nombre de tu tabla
        Key: { peopleId : id },
    };
    try {
        return this.dynamoDB.get(params).promise();
    } catch (error) {
        throw new Error(`Error al crear el ítem: ${error.message}`);
    }
}
}