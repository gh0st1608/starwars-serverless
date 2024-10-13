import { config } from 'dotenv-safe';
config();

export class Parameters {
    static get port(): number {
      return Number(process.env.PORT);
    }
    
    static get confDynamoDB() {
        return {
            host: process.env.DB_DYNAMO_URL,
            table: process.env.DB_DYNAMO_TABLE,
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


  /*   static get dbConfig() {
      return {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [CourseEntity, UserEntity, RoleEntity],
        synchronize: process.env.DB_SYNCHRONIZE === "true" ? true : false,
        logging: process.env.DB_LOGGING === "true" ? true : false,
        poolSize: Number(process.env.DB_POOL_SIZE),
        maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME),
      };
    }
   */
    static get jwtConfig() {
      return {
        secret: process.env.JWT_SECRET,
        expiresIn: Number(process.env.JWT_EXPIRES_IN),
      };
    }
    static get dbRedisConfig() {
      return {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      };
    }
  }