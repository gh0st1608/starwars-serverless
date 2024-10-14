import { config } from 'dotenv';
config();

export class Parameters {
    static get env(): string {
      return process.env.ENV ?? 'development';
    }

    static get port(): number {
      return Number(process.env.PORT) ?? 3000;
    }
    
    static get confDynamoDB() {
      return {
          endpoint: process.env.DB_DYNAMO_ENDPOINT ?? '',
          table: process.env.DB_DYNAMO_TABLE ?? '',
        };
    }

    static get apiStarWars() {
      return {
          url: process.env.SWAPI_URL ?? ''
      }
    }

    static get confAws() {
      return {
        region : process.env.REGION ?? ''
      }
    }
  }