import { getPathHandler } from "../libs/getPathHandler";
const prefix = 'people'

export const getPeople = {
  handler: `${getPathHandler(__dirname)}/handler.${prefix}Handler`,
  events: [
    {
      http: {
        method: 'get',
        path: `${prefix}`,
        documentation: {
          summary: "Get People",
          tag: "People",
          description: "Gets List People",
          requestBody: {
            description: "A people list information object"
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
       /*  cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        }, */
      },
    },
  ],
}

export const getPeopleOne = {
  handler: `${getPathHandler(__dirname)}/handler.${prefix}OneHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: `${prefix}/{id}`,
        documentation: {
          summary: "Get People by Id",
          tag: "People",
          description: "Get One People",
          requestBody: {
            description: "A people one information object"
          },
          pathParams: {
            name : "id",
            description: "The people id for a get one people",
            schema: { type: "string" }
            /* schema: {
                type: "string",
                pattern: "^[0-9_]+$"
            }   */  
          },
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
        //cors: true,
      },
    },
  ],
}

export const getPeopleSchema = {
  handler: `${getPathHandler(__dirname)}/handler.${prefix}SchemaHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: `${prefix}/schema`,
        documentation: {
          summary: "Get Schema People",
          tag: "People",
          description: "Get Schema People",
          requestBody: {
            description: "A people schema information object"
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
        //cors: true,
      },
    },
  ],
}

export const createPeople = {
  handler: `${getPathHandler(__dirname)}/handler.${prefix}CreateHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: `${prefix}`,
        documentation: {
          summary: "Create One People",
          tag: "People",
          description: "Create One People",
          requestBody: {
            description: "A people information object"
          },
          requestModels: { "application/json" : "BodyPeopleRequest"},
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
        //cors: true,
      },
    },
  ],
}