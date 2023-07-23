const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stefan Freitag',
  authorAddress: 'stefan.freitag@udo.edu',
  cdkVersion: '2.88.0',
  defaultReleaseBranch: 'main',
  name: 'terraform-backend-s3-bucket',
  description: 'Creates an S3 bucket and a DynamoDB table for Terraform state and lock management.',
  repositoryUrl:
    'https://github.com/stefanfreitag/terraform-backend-s3-bucket.git',
  codeCov: true,
  devDeps: [
    '@aws-cdk/integ-tests-alpha@2.88.0-alpha.0',
    '@aws-cdk/integ-runner@2.88.0-alpha.0',
    'cdk-nag@2.27.75',
    'ts-node',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.MONTHLY,
    },
  },
  keywords: ['aws', 'backend', 's3', 'terraform'],
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
  tsconfigDev: {
    compilerOptions: {
      ignoreDeprecations: '5.0',
    },
  },
  tsconfig: {
    compilerOptions: {
      ignoreDeprecations: '5.0',
    },
  },
});

const common_exclude = ['.history/'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
