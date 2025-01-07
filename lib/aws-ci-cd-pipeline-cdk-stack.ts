import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { ManualApprovalStep } from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./stage";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCiCdPipelineCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "zhlee1997/aws-ci-cd-pipeline-cdk",
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const testingStage = pipeline.addStage(
      new MyPipelineAppStage(this, "test", {
        env: { account: "565428532910", region: "us-east-1" },
      })
    );

    testingStage.addPost(
      new ManualApprovalStep("Manual approval before production")
    );

    const prodStage = pipeline.addStage(
      new MyPipelineAppStage(this, "prod", {
        env: { account: "565428532910", region: "us-east-1" },
      })
    );
  }
}
