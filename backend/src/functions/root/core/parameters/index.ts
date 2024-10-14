import { config } from 'dotenv';
config();

export class Parameters {
    static get env(): string {
      return process.env.ENV ?? 'development';
    }

    static get port(): number {
      return Number(process.env.PORT);
    }
    
    static get apiStarWars() {
      return {
          url: process.env.SWAPI_URL ?? ''
      }
    }
  }