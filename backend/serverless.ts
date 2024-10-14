import type { AWS } from "@serverless/typescript";
import { root, getPeople, getPeopleOne, getPeopleSchema, createPeople } from "./src/functions";
import * as path from "path";

const outputDir = path.join(__dirname, "dist");

const serverlessConfiguration: AWS = {
  service: "starwars-app",
  frameworkVersion: "4",
  plugins: ["serverless-offline","serverless-openapi-documentation"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "${opt:stage, 'dev'}", // Establecido a dev para uso local
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ENV: "dev",
      DB_DYNAMO_ENDPOINT: "http://localhost:4566",
      DB_DYNAMO_TABLE: "PeopleTable",
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
            "Effect": "Allow",
            "Action": "ssm:GetParameter",
            "Resource": "*"
          },
          {
            Effect: "Allow",
            Action: "s3:*", // Permiso para S3
            Resource: "arn:aws:s3:::bucket-swapi-${self:provider.stage}/*", // Recurso del bucket
          },
          {
            Effect: "Allow",
            Action: "dynamodb:*",
            Resource: "arn:aws:dynamodb:us-east-1:*:table/PeopleTable",
          },
        ],
      },
    },
  },
  
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      platform: "node",
      concurrency: 10,
      output: `${outputDir}/`
    },
    /* apiGateway: {
      restApiId: "wj33urp139",
      restApiRootResourceId: "ur83wck6fa",
    }, */
    /*openapiDocumentation: `${file(serverless.doc.yml)}` */
    /* documentation: {
      version: '1',
      title: 'My API',
      description: 'This is my API',
      models: {}
    } */
  },
  functions: { root, getPeople, getPeopleOne, getPeopleSchema, createPeople },
};

module.exports = serverlessConfiguration;