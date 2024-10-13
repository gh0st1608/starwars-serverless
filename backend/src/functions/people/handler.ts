import { PeopleController } from "./adapters/http/people.controller";
import { PeopleApplication } from "./application/people.application";
import { PeopleRepository } from "./domain/repositories/people.repository";
import { PeopleInfrastructure } from "./infrastructure/people.infrastructure";
import { DynamoDBRepository } from "./infrastructure/dynamodb.infrastructure";


const repositoryPeople: PeopleRepository = new PeopleInfrastructure();
const repositoryDynamoDB = new DynamoDBRepository();
const applicationPeople: PeopleApplication = new PeopleApplication(
  repositoryPeople, repositoryDynamoDB
);
const controllerPeople: PeopleController = new PeopleController(
  applicationPeople
);

export const peopleHandler = async (event) => {
  const listRoot = await controllerPeople.get();
  return {
    statusCode: 200,
    body: JSON.stringify(listRoot),
  };
};

export const peopleOneHandler = async (event) => {
  const idPeople = event.pathParameters.id;
  const peopleFound = await controllerPeople.getOne(idPeople);
  console.log('peopleFound',peopleFound)
  if(peopleFound) return {
    statusCode: 404,
    body: JSON.stringify(peopleFound),
  };
  return {
    statusCode: 200,
    body: JSON.stringify(peopleFound),
  };
};

export const peopleSchemaHandler = async (event) => {
  const peopleSchemaFound = await controllerPeople.getSchema();
  return {
    statusCode: 200,
    body: JSON.stringify(peopleSchemaFound),
  };
};

export const peopleCreateHandler = async (event) => {
  const item = JSON.parse(event.body);
  await controllerPeople.create(item);
  return {
    statusCode: 200,
    body: 'ok',
  };
};

