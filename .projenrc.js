const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpgradeDependenciesSchedule } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stefan Freitag',
  authorAddress: 'stefan.freitag@udo.edu',
  cdkVersion: '2.69.0',
  defaultReleaseBranch: 'main',
  name: 'terraform-backend-s3-bucket',
  repositoryUrl:
    'https://github.com/stefanfreitag/terraform-backend-s3-bucket.git',
  codeCov: true,
  devDeps: [
    '@aws-cdk/integ-tests-alpha@2.69.0-alpha.0',
    '@aws-cdk/integ-runner@2.69.0',
    'ts-node',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  stability: Stability.EXPERIMENTAL,
  publishToPypi: {
    module: 'terraform_backend_s3_bucket',
    distName: 'terraform-backend-s3-bucket',
  },
});

const common_exclude = ['.history/'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
