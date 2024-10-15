import { getPathHandler } from "../libs/getPathHandler";
export const getRoot = {
  handler: `${getPathHandler(__dirname)}/handler.rootHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "root",
        documentation: {
          summary: "Get Root",
          tag: "Root",
          description: "Gets Resources",
          requestBody: {
            description: "A root information object"
          },
          requestModels: {},
          methodResponses: [
            {
              statusCode: 200,
              responseBody: { description: "Operation sucessfull"},
              responseModels: { "application/json" : "SucessfullResponse"}
            },
            {
              statusCode: 500,
              responseBody: { description: "Operation failed"},
              responseModels: { "application/json" : "ErrorResponse"}
            }
          ]  
        }
      },
    },
  ],
};
