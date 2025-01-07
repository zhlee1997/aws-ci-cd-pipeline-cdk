#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCiCdPipelineCdkStack } from "../lib/aws-ci-cd-pipeline-cdk-stack";

const app = new cdk.App();
new AwsCiCdPipelineCdkStack(app, "AwsCiCdPipelineCdkStack", {
  env: {
    account: "565428532910",
    region: "us-east-1",
  },
});

app.synth();
