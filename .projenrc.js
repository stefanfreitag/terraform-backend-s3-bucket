const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stefan Freitag',
  authorAddress: 'stefan.freitag@rwe.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'terraform-backend-s3-bucket',
  repositoryUrl: 'https://github.com/stefanfreitag/terraform-backend-s3-bucket.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();