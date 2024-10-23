import AWS from 'aws-sdk';
import { Parameters } from "../core/parameters";
import { DynamoDBOptions } from '../core/interfaces';
import { People } from '../domain/people';
import { err, ok, Result } from 'neverthrow'

export class DynamoDBRepository  {
  static instance: any;
  dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    if (DynamoDBRepository.instance) {
        return DynamoDBRepository.instance;
    }

    const dynamoDBOptions : DynamoDBOptions = {
        region: Parameters.confAws.region
    };

    if (process.env.ENV === 'dev') {
        dynamoDBOptions.endpoint = Parameters.confDynamoDB.endpoint; // URL de LocalStack
    }
    
    this.dynamoDB = new AWS.DynamoDB.DocumentClient(dynamoDBOptions);

    DynamoDBRepository.instance = this;
  }

  async createItem(people : People) {
    const { id, ...item } = people.properties()
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

  async getItem(id : string) : Promise<Result<People,Error>> {
    const params = {
        TableName: Parameters.confDynamoDB.table, // Cambia por el nombre de tu tabla
        Key: { peopleId : id },
    };

    try {
        const result = await this.dynamoDB.get(params).promise();
        if (!result.Item) {
           return err(new Error('Error fetching data'))
        }
        return ok(result.Item as People)
    } catch (error) {
        throw new Error(`Error al conseguir el ítem: ${error.message}`);
    }
}
}