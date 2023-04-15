const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stefan Freitag',
  authorAddress: 'stefan.freitag@udo.edu',
  cdkVersion: '2.74.0',
  defaultReleaseBranch: 'main',
  name: 'terraform-backend-s3-bucket',
  description: 'Creates an S3 bucket and a DynamoDB table for Terraform state and lock management.',
  repositoryUrl:
    'https://github.com/stefanfreitag/terraform-backend-s3-bucket.git',
  codeCov: true,
  devDeps: [
    '@aws-cdk/integ-tests-alpha@2.74.0-alpha.0',
    '@aws-cdk/integ-runner@2.74.0-alpha.0',
    'cdk-nag@2.25.12',
    'ts-node',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  stability: Stability.EXPERIMENTAL,
  publishToMaven: {
    javaPackage: 'io.github.stefanfreitag.cdk.terraformstatebackend',
    mavenArtifactId: 'terraformStateBackend',
    mavenGroupId: 'io.github.stefanfreitag',
  },
  publishToNuget: {
    dotNetNamespace: 'Io.Github.StefanFreitag',
    packageId: 'Io.Github.StefanFreitag.TerraformStateBackend',
  },
  publishToPypi: {
    module: 'terraform_backend_s3_bucket',
    distName: 'terraform-backend-s3-bucket',
  },
});

const common_exclude = ['.history/'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
