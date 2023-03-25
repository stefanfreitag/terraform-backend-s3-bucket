import {
  AssertionsProvider,
  ExpectedResult,
  IntegTest,
} from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { TerraformStateBackend } from '../src';

class StackUnderTest extends cdk.Stack {
  stateBackend: TerraformStateBackend;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    let suffix = Math.random().toString(36).slice(2, 7);
    this.stateBackend = new TerraformStateBackend(this, 'backend', {
      bucketName: 'sf-terraform-state-bucket-' + suffix,
      tableName: 'sf-terraform-state-lock-table-' + suffix,
    });
  }
}

// Beginning of the test suite
const app = new cdk.App();

const stack = new StackUnderTest(app, 'terraform-state-backend', {});
const integ = new IntegTest(app, 'MyTestCase', {
  regions: ['eu-central-1'],
  testCases: [stack],
});

// Ensure versioning is enabled
const versioningOutput = integ.assertions.awsApiCall(
  'S3',
  'getBucketVersioning',
  {
    Bucket: stack.stateBackend.bucket.bucketName,
  },
);

versioningOutput.expect(
  ExpectedResult.objectLike({
    Status: 'Enabled',
  }),
);

// Ensure encryption is enabled
const encryptionOutput = integ.assertions.awsApiCall(
  'S3',
  'getBucketEncryption',
  {
    Bucket: stack.stateBackend.bucket.bucketName,
  },
);

const assertionProvider = encryptionOutput.node.tryFindChild(
  'SdkProvider',
) as AssertionsProvider;
assertionProvider.addPolicyStatementFromSdkCall(
  's3',
  'GetEncryptionConfiguration',
  [stack.stateBackend.bucket.bucketArn],
);
encryptionOutput.expect(
  ExpectedResult.objectLike({
    ServerSideEncryptionConfiguration: {
      Rules: [
        {
          ApplyServerSideEncryptionByDefault: {
            SSEAlgorithm: 'AES256',
          },
        },
      ],
    },
  }),
);
