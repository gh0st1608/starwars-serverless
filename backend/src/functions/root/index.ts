import { getPathHandler } from "../libs/getPathHandler";
export default {
  handler: `${getPathHandler(__dirname)}/handler.rootHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "/root",
        /*documentation: {
          summary: "Get Root",
          description: "Gets Resources and then sends a generated password email",
          requestBody: {
            description: "A user information object"
          },
          methodResponses: [
            {
              statusCode: 201,
              responseBody: { description: "A user object along with generated API Keys"}
            },
            {
              statusCode: 500,
              responseBody: { description: "A user object along with generated API Keys"}
            }
          ]  
        }*/
      },
    },
  ],
};
