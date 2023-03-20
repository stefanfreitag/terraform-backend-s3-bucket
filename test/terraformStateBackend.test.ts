import * as cdk from 'aws-cdk-lib';
import { assertions } from 'aws-cdk-lib';
import { TerraformStateBackend } from '../src';

describe('Bucket Configuration', () =>{

  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();

    stack = new cdk.Stack(app, 'stack', {});
    new TerraformStateBackend(stack, 'backend', {
      bucketName: '',
      tableName: '',
    });
  });

  test('Versioning is enabled', () => {
    assertions.Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      VersioningConfiguration: { Status: 'Enabled' },
    });
  });

  test('Public access is blocked', () => {
    assertions.Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
  });

});

describe('DynamoDB Configuration', () =>{

  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();

    stack = new cdk.Stack(app, 'stack', {});
    new TerraformStateBackend(stack, 'backend', {
      bucketName: '',
      tableName: '',
    });
  });

  test('Billing mode is pay per request', () => {
    assertions.Template.fromStack(stack).hasResourceProperties('AWS::DynamoDB::Table', {
      BillingMode: 'PAY_PER_REQUEST',
    });


  });

});
