import { getPathHandler } from "../libs/getPathHandler";
export default {
  handler: `${getPathHandler(__dirname)}/handler.rootHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "/root",
      },
    },
  ],
};
