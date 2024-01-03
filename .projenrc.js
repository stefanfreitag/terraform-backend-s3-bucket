const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stefan Freitag',
  authorAddress: 'stefan.freitag@udo.edu',
  authorOrganization: false,
  cdkVersion: '2.117.0',
  defaultReleaseBranch: 'main',
  name: 'terraform-backend-s3-bucket',
  description: 'Creates an S3 bucket and a DynamoDB table for Terraform state and lock management.',
  repositoryUrl:
    'https://github.com/stefanfreitag/terraform-backend-s3-bucket.git',
  codeCov: true,
  jsiiVersion: '~5.3.2',
  jestOptions: {
    jestVersion: '^29',
  },
  devDeps: [
    '@aws-cdk/integ-tests-alpha@2.117.0-alpha.0',
    '@aws-cdk/integ-runner@2.117.0-alpha.0',
    'cdk-nag@2.27.229',
    'ts-node',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.MONTHLY,
    },
  },
  keywords: ['aws', 'backend', 's3', 'terraform'],
  majorVersion: 1,
  stability: Stability.STABLE,
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
  typescriptVersion: '~5.1.6',
});

const common_exclude = ['.history/', '.dccache'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
