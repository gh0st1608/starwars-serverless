import { getPathHandler } from "../libs/getPathHandler";
const prefix = 'people'

export const getPeople = {
  handler: `${getPathHandler(__dirname)}/handler.${prefix}Handler`,
  events: [
    {
      http: {
        method: 'get',
        path: `${prefix}`,
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
        //cors: true,
      },
    },
  ],
}