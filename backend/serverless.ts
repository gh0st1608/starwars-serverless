import type { AWS } from "@serverless/typescript";
import BadRequest from "./models/bad-request.json";
import InternalServerError from "./models/internal-server-error.json";
import NotFound from "./models/not-found.json";
import SuccessResponse from "./models/success.response.json";
import RequestBody from "./models/request-body.json";
import { getRoot, getPeople, getPeopleOne, getPeopleSchema, createPeople } from "./src/functions";
import * as path from "path";

const outputDir = path.join(__dirname, "dist");

const serverlessConfiguration: AWS = {
  service: "starwars-app",
  frameworkVersion: "4",
  plugins: ["serverless-offline", "serverless-openapi-documentation", "serverless-localstack"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ENV: "${self:provider.stage}",
      DB_DYNAMO_ENDPOINT: "http://localhost:4566",
      DB_DYNAMO_TABLE: "peopleTable-${self:provider.stage}",
      REGION: "us-east-1",
      SWAPI_URL: "https://swapi.py4e.com/api"
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: "${ssm:/store/s3-bucket-deployment-${self:provider.stage}}",
    },
    iam: {
      role: {
        name: "starwars-app-role-${self:provider.stage}",
        statements: [
          {
            Effect: "Allow",
            Action: [
              "logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents",
            ],
            Resource: "arn:aws:logs:*:*:*",
          },
          {
            Effect: "Allow",
            Action: "ssm:GetParameter",
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: "arn:aws:s3:::bucket-swapi-${self:provider.stage}/*",
          },
          {
            Effect: "Allow",
            Action: "dynamodb:*",
            Resource: "arn:aws:dynamodb:us-east-1:*:table/peopleTable-${self:provider.stage}",
          },
        ],
      },
    },
  },
  
  package: { individually: true },
  custom: {
    //localstack: { stages: 'local', host: 'http://localhost', edgePort: 4566 },
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      platform: "node",
      concurrency: 10,
      output: `${outputDir}/`,
    },
    documentation: {
      version: '1',
      title: 'StarWars Serverless API',
      description: 'Serverless API',
      models: [
        {
          name: "BadRequest",
          description: "This is an error",
          contentType: "application/json",
          schema: BadRequest,
        },
        {
          name: "InternalServerError",
          description: "This is an error",
          contentType: "application/json",
          schema: InternalServerError,
        },
        {
          name: "NotFound",
          description: "This is an error",
          contentType: "application/json",
          schema: NotFound,
        },
        {
          name: "SuccessfulResponse",
          description: "Successful operation",
          contentType: "application/json",
          schema: SuccessResponse,
        },
        {
          name: "BodyPeopleRequest",
          description: "Post operation",
          contentType: "application/json",
          schema: RequestBody,
        },
      ],
      typescriptApiPath: 'api.d.ts',
      tsconfigPath: 'tsconfig.json',
    },
  },
  functions: { getRoot, getPeople, getPeopleOne, getPeopleSchema, createPeople },
};

module.exports = serverlessConfiguration;