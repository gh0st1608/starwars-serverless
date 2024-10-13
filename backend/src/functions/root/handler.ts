import { RootController } from "./adapters/root.controller";
import { RootApplication } from "./application/root.application";
/* import { Root, FieldsRequired } from "./domain/root"; */
import { RootRepository } from "./domain/repositories/root.repository";
import { RootInfrastructure } from "./infrastructure/root.infrastructure";
/* import joi from "joi"; */
/* import { BusinessError } from "./core/handle-errors/errors.helper"; */

const repositoryRoot: RootRepository = new RootInfrastructure();
const applicationRoot: RootApplication = new RootApplication(
  repositoryRoot
);
const controllerRoot: RootController = new RootController(
  applicationRoot
);

export const rootHandler = async (event) => {
  const listRoot = await controllerRoot.get();
  return {
    statusCode: 200,
    body: JSON.stringify(listRoot),
  };
};
