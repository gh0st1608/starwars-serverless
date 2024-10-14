import type { AWS } from "@serverless/typescript";

import { root, getPeople, getPeopleOne, getPeopleSchema, createPeople } from "./src/functions";
import * as path from "path";

const outputDir = path.join(__dirname, "dist");

const serverlessConfiguration: AWS = {
  service: "starwars-app",
  frameworkVersion: "4",
  plugins: ["serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "${opt:stage, 'dev'}", // Establecido a dev para uso local
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DYNAMODB_TABLE: "PeopleTable",
      S3_BUCKET: "bucket-swapi"
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
            Resource: "arn:aws:s3:::bucket-swapi/*", // Recurso del bucket
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
    apiGateway: {
      restApiId: "wj33urp139",
      restApiRootResourceId: "ur83wck6fa",
    },
  },
  functions: { root, getPeople, getPeopleOne, getPeopleSchema, createPeople },
};

module.exports = serverlessConfiguration;