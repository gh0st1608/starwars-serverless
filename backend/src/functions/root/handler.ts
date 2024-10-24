import { RootController } from "./adapters/http/root.controller";
import { RootApplication } from "./application/root.application";
import { RootRepository } from "./domain/repositories/root.repository";
import { RootInfrastructure } from "./infrastructure/root.infrastructure";

const repositoryRoot: RootRepository = new RootInfrastructure();
const applicationRoot: RootApplication = new RootApplication(
  repositoryRoot
);
const controllerRoot: RootController = new RootController(
  applicationRoot
);

export const rootHandler = async () => {
  const root = await controllerRoot.get();
  if(root.isOk()) return { statusCode: 200, body: JSON.stringify(root.value) }
  return {
    statusCode: 404,
    body: JSON.stringify({message : 'root not found'}),
  };
};
