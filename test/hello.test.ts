import * as cdk from 'aws-cdk-lib/';
import * as assertions from 'aws-cdk-lib/assertions';
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

  test('', () => {


  });

});
