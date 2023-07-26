import * as cdk from 'aws-cdk-lib';
import { Aspects, assertions } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, HIPAASecurityChecks, NagSuppressions } from 'cdk-nag';
import { TerraformStateBackend } from '../src';

describe('Ensure passing AWSSolutionChecks', () => {
  let stack: cdk.Stack;
  let app: cdk.App;
  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'stack', {});
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'AwsSolutions-S1', reason: 'Access Logs for Terraform Bucket not implemented.' },
    ]);

    Aspects.of(app).add(new AwsSolutionsChecks({
      verbose: true,
    }));

    new TerraformStateBackend(stack, 'backend', {
      bucketName: 'tf-state-bucket',
      tableName: 'tf-state-lock',
    });
  });

  test('No unsuppressed Warnings', () => {
    const warnings = Annotations.fromStack(stack).findWarning(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(warnings).toHaveLength(0);
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);
  });
});

describe('Ensure passing HIPAASecurityChecks', () => {
  let stack: cdk.Stack;
  let app: cdk.App;
  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'stack', {});
    NagSuppressions.addStackSuppressions(stack, [
      { id: 'HIPAA.Security-S3BucketLoggingEnabled', reason: 'Access Logs for Terraform Bucket not implemented.' },
      { id: 'HIPAA.Security-S3BucketReplicationEnabled', reason: 'Cross-region replication for Terraform Bucket not implemented.' },
      { id: 'HIPAA.Security-DynamoDBInBackupPlan', reason: 'Backup plan for DynamoDB table not implemented.' },
      { id: 'HIPAA.Security-S3DefaultEncryptionKMS', reason: 'KMS usage currently not implemented.' },
    ]);

    Aspects.of(app).add(new HIPAASecurityChecks({
      reports: true,
      verbose: true,
    }));

    new TerraformStateBackend(stack, 'backend', {
      bucketName: 'tf-state-bucket',
      tableName: 'tf-state-lock',
    });
  });

  test('No unsuppressed Warnings', () => {
    const warnings = Annotations.fromStack(stack).findWarning(
      '*',
      Match.stringLikeRegexp('HIPAA.*'),
    );
    expect(warnings).toHaveLength(0);
  });

  test('No unsuppressed Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('HIPAA.*'),
    );
    expect(errors).toHaveLength(0);
  });
});

describe('Bucket Configuration', () => {
  let stack: cdk.Stack;

  let backend: TerraformStateBackend;
  beforeEach(() => {
    const app = new cdk.App();

    stack = new cdk.Stack(app, 'stack', {});
    backend = new TerraformStateBackend(stack, 'backend', {
      bucketName: '',
      tableName: '',
    });
  });

  test('[S3.2] S3 buckets should prohibit public read access', () => {
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::S3::Bucket',
      {
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
      },
    );
  });

  //TODO
  test('[S3.4] S3 buckets should have server-side encryption enabled', () => {
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::S3::Bucket',
      {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            { ServerSideEncryptionByDefault: { SSEAlgorithm: 'aws:kms' } },
          ],
        },
      },
    );
  });

  test('[S3.5] S3 buckets should require requests to use Secure Socket Layer', () => {
    const template = assertions.Template.fromStack(stack);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);

    const logicalId = stack.getLogicalId(backend.bucket.node.defaultChild as cdk.CfnResource);

    template.hasResourceProperties(
      'AWS::S3::BucketPolicy',
      {
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:*',
              Condition: {
                Bool: {
                  'aws:SecureTransport': 'false',
                },
              },
              Effect: 'Deny',
              Principal: {
                AWS: '*',
              },
              Resource: [
                {
                  'Fn::GetAtt': [
                    logicalId,
                    'Arn',
                  ],
                },
                {
                  'Fn::Join': [
                    '',
                    [
                      {
                        'Fn::GetAtt': [
                          logicalId,
                          'Arn',
                        ],
                      },
                      '/*',
                    ],
                  ],
                },
              ],
            },
          ],
        },
      },
    );
  });

  test('[S3.14] S3 buckets should use versioning', () => {
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::S3::Bucket',
      {
        VersioningConfiguration: { Status: 'Enabled' },
      },
    );
  });

  test('Lifecycle policy is defined', () => {
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::S3::Bucket',
      {
        LifecycleConfiguration: {
          Rules: [
            {
              Status: 'Enabled',
              NoncurrentVersionTransitions: Match.anyValue(),
            },
          ],
        },
      },
    );
  });
});

describe('DynamoDB Configuration', () => {
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
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::DynamoDB::Table',
      {
        BillingMode: 'PAY_PER_REQUEST',
      },
    );
  });

  test('[DynamoDB.2] DynamoDB tables should have point-in-time recovery enabled', () => {
    assertions.Template.fromStack(stack).hasResourceProperties(
      'AWS::DynamoDB::Table',
      {
        PointInTimeRecoverySpecification: {
          PointInTimeRecoveryEnabled: true,
        },
      },
    );
  });
});
