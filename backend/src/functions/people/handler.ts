import { PeopleController } from "./adapters/http/people.controller";
import { PeopleApplication } from "./application/people.application";
import { PeopleRepository } from "./domain/repositories/people.repository";
import { PeopleInfrastructure } from "./infrastructure/people.infrastructure";
import { DynamoDBRepository } from "./infrastructure/dynamodb.infrastructure";
import { ResponseHttp } from "./core/interfaces";
import { PeopleCreateDto }  from './adapters/dtos/people.create.dto';
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer';
import { People } from "./domain/people";


const repositoryPeople: PeopleRepository = new PeopleInfrastructure();
const repositoryDynamoDB = new DynamoDBRepository();
const applicationPeople: PeopleApplication = new PeopleApplication(
  repositoryPeople, repositoryDynamoDB
);
const controllerPeople: PeopleController = new PeopleController(
  applicationPeople
);

export const peopleHandler = async () : Promise<ResponseHttp> => {
  const peopleList = await controllerPeople.get();
  if(peopleList.isOk()) return { statusCode: 200, body: JSON.stringify(peopleList.value) }
  return {
    statusCode: 404,
    body: JSON.stringify({message : 'listPeople not found'}),
  };
};

export const peopleOneHandler = async (event) : Promise<ResponseHttp> => {
  const idPeople = event.pathParameters.id;
  const peopleFound = await controllerPeople.getOne(idPeople);
  if(peopleFound.isOk()) return { statusCode: 200, body: JSON.stringify(peopleFound.value)};
  return {
    statusCode: 404,
    body: JSON.stringify({}),
  };
};

export const peopleSchemaHandler = async () => {
  const peopleSchemaFound = await controllerPeople.getSchema();
  return {
    statusCode: 200,
    body: JSON.stringify(peopleSchemaFound),
  };
};

export const peopleCreateHandler = async (event) => {
  const item = JSON.parse(event.body);
  const peopleDto = plainToClass(PeopleCreateDto, item);
  const errors = await validate(peopleDto);
  if (errors.length > 0) {
    // Devuelve un error 400 si hay errores de validación
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Validation failed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      }),
    };
  }

    // Crea una nueva instancia de People
    const people = new People(peopleDto);
    await controllerPeople.create(people);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message : 'created sucessfully'}),
  };
};

