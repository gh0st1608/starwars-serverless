import type { AWS } from "@serverless/typescript";

import { root, getPeople, getPeopleOne, getPeopleSchema, createPeople } from "./src/functions";
import * as path from "path";

const outputDir = path.join(__dirname, "dist");

const serverlessConfiguration: AWS = {
  service: "starwars-api",
  frameworkVersion: "4",
  plugins: ["serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "dev", // Establecido a dev para uso local
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      LAMBDA_CORE_PE: "appointment-pe-dev-appointment",
      SNS_TOPICO_CURSO03_ARN: "local-sns-topic-arn", // Valor local
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
  },
  functions: { root, getPeople, getPeopleOne, getPeopleSchema, createPeople },
};

module.exports = serverlessConfiguration;